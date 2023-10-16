import md5 from 'md5';
let minio = require('minio')

export class Minio {

		static minioClient = new minio.Client({
			endPoint: 'localhost',
			port: 9000,
			useSSL: false,
			accessKey: 'admin',
			secretKey: 'adminadmin',
		})

		static async upload(file, bucketName='embrave') {

		if (!(file.type.includes('jpeg') || file.type.includes('png'))) {

		}

		console.log('FILE : ', file);
		let fileData =  URL.createObjectURL(file)
		console.log('fileBuffer : ', fileData)

		const timestamp = Date.now().toString();
		const hashedFileName = md5(timestamp);

		const extension = file.name.substring(
				file.name.lastIndexOf('.'),
				file.name.length,
		);
		const metaData = {
			'Content-Type': file.type,
		};

		// We need to append the extension at the end otherwise Minio will save it as a generic file
		const fileName = hashedFileName;

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