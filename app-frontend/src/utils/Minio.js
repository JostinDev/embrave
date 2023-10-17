import md5 from 'md5';

let minio = require('minio')

export class Minio {

	static minioClient = new minio.Client({
		endPoint: 'localhost',
		port: 8080,
		useSSL: false,
		accessKey: 'admin',
		secretKey: 'adminadmin',
	})

	static async upload(file, bucketName = 'embrave') {

		console.log('FILE : ', file);
		console.log('FILE TYPE : ', file.type);

		if (!(file.type.includes('jpeg') || file.type.includes('png'))) {

		}

		let fileData = URL.createObjectURL(file)
		console.log('fileBuffer : ', fileData)

		const timestamp = Date.now().toString();
		const hashedFileName = md5(timestamp);

		const image = file.name

		const extension = image.substring(image.lastIndexOf('.') + 1, image.length) || image;

		console.log('extension  : ', extension)

		// We need to append the extension at the end otherwise Minio will save it as a generic file
		const fileName = hashedFileName + '.' + extension;

		console.log('fileName : ', fileName)

		this.minioClient.putObject(
				bucketName,
				fileName,
				fileData,
				function (err, res) {
					if (err) {
						console.log(err)
					}
					console.log('Success', res)
				},
		);
	}
}