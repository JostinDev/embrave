export default async function compressImages(
  files: File[],
  maxWidth: number,
  maxHeight: number,
  quality: number = 0.5,
): Promise<File[]> {
  // Helper function to convert File to Image
  const fileToImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Helper function to resize and compress the image
  const compressImage = (img: HTMLImageElement, file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let width = img.width;
      let height = img.height;

      // Check if resizing is necessary
      if (width > maxWidth) {
        height = Math.round((maxWidth / width) * height);
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.round((maxHeight / height) * width);
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      const fileType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'; // Maintain PNG or convert to JPEG
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, { type: fileType });
            resolve(compressedFile);
          }
        },
        fileType,
        quality, // Adjust quality for compression
      );
    });
  };

  // Iterate over each file and compress it
  return await Promise.all(
    files.map(async (file) => {
      const image = await fileToImage(file);
      return compressImage(image, file);
    }),
  );
}
