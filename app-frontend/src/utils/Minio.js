import md5 from 'md5';
const minio = require('minio')
export class Minio {


	static minioClient = new minio.Client({
		endPoint: 'localhost',
		port: 9000,
		useSSL: false,
		accessKey: 'admin',
		secretKey: 'adminadmin',
	})

	static async upload(files, bucketName = 'embrave') {


		

		const toBase64 = file => new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
		});


		console.log('LES FILES : ', files);

		for (const file of Array.from(files)) {

			console.log('READ FILE ====>',await fs.read(file))


			console.log("THE FILE", file);

			if (!(file.type.includes('jpeg') || file.type.includes('png'))) {
				throw new Error("The file is not a picture");
			}

			let fileData = URL.createObjectURL(file)

			console.log('fileBuffer : ', fileData)

			const timestamp = Date.now().toString();
			const hashedFileName = md5(timestamp + file.name);

			const image = file.name
			const extension = image.substring(image.lastIndexOf('.') + 1, image.length) || image;

			const fileName = hashedFileName + '.' + extension;

			console.log('fileName : ', fileName)

			let metaData = {
				'Content-Type': 'image/png',
				'Content-Language': 123,
				'X-Amz-Meta-Testing': 1234,
				example: 5678,
			}

			this.minioClient.fPutObject(
					bucketName,
					fileName,
					fileData,
					metaData,
					function (err, res) {
						if (err) {
							throw (err);
						}
						console.log('RES : ', res)
						return res
					},
			);
		}
	}
}