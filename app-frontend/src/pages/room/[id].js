import '../../app/globals.css';
import {useEffect, useState} from "react";
import {minio} from 'minio'
import {useRouter} from "next/router";
import md5 from "md5";

export default function Challenge() {

	const [room, setRoom] = useState([]);
	const [milestoneList, setMilestoneList] = useState([]);

	const [milestonePicture, setMilestonePicture] = useState([]);
	const [milestoneDescription, setMilestoneDescription] = useState();

	const [uploadedPicture, setUploadedPicture] = useState([]);

	const router = useRouter()
	const { id } = router.query

	let pictureLink = [];

	useEffect(() => {

		if(router.isReady){
			const { id } = router.query;
			if (!id) return null;
			fetchMilestone()
		}
		console.log(id)
		console.log(router.query)

	}, [router.isReady]);


	const fetchMilestone = async () => {
		try {
			const response = (await fetch(`/api/milestone/${id}`))

			await response.json().then((response) => {
						console.log(response)

						setMilestoneList(response)

						console.log('GET ALL MILESTONES : ' , response)
					}
			);


		} catch (error) {
			console.error(error);
		}
	};


	async function upload() {

		let promiseArray = [];
		// Get selected files from the input element.
		Array.from(milestonePicture).map(async (file) => {
			const timestamp = Date.now().toString();
			const hashedFileName = md5(timestamp + file.name);
			const filename = file.name;
			const extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;

			let fileWithUpdatedName = new File([file], hashedFileName + '.' + extension)

			promiseArray.push(new Promise(async (resolve, reject) => {
				fetch(`/api/milestone/presigned/${fileWithUpdatedName.name}`)
						.then((response) => {
							response.text()
									.then(async (url) => {
										fetch(url, {
											method: 'PUT',
											body: fileWithUpdatedName
										}).then(() => {
											setUploadedPicture(uploadedPicture => [...uploadedPicture, fileWithUpdatedName.name])
											pictureLink = [...pictureLink, fileWithUpdatedName.name]
											console.log(fileWithUpdatedName.name)
											resolve(fileWithUpdatedName.name)
										}).catch((e) => {
											console.error(e);
											reject(e)
										});
									});
						}).catch((e) => {
					console.error(e);
				});
			}));
		});
		await Promise.all(promiseArray);
		await saveMilestone(id)
	}

	async function saveMilestone(milestoneID) {
		console.log('SAVE MILESTONE')
		console.log(pictureLink)
		console.log('FOR MILESTONE : ', id)

		const formData = new FormData()



		formData.append('description', milestoneDescription)
		formData.append('roomID', id)
		formData.append('files', pictureLink)

		const data = {
			room: milestoneID,
			description: milestoneDescription,
			files: pictureLink
		};

		console.log(JSON.stringify(data))

		try {
			await fetch("/api/milestone", {
				method: 'POST',
				body: formData
			});
		} catch (e) {
			console.log(e)
		}
	}



	return (
			<div className="min-h-screen bg-blue-500 pt-20">
				<div className='mx-auto mt-10 p-10 rounded-md bg-white w-1/2 max-w-2xl'>
					<h1 className='mb-10 text-2xl'>Post milestone</h1>

					<h1 className={'text-2xl mt-10'}>Milestone</h1>
					<input id="image-file" type="file" accept=".png, .jpg, .jpeg" multiple
								 onChange={(e) => setMilestonePicture(e.target.files)}/>
					<img className={'w-40'} id={'pic'} src={''}></img>
					<label htmlFor={'milestoneDescription'}>Description</label>
					<input
							className={'border border-b-gray-400'} id={'milestoneDescription'} type={'text'}
							onChange={(e) => setMilestoneDescription(e.target.value)}/>

					<h1 className={'text-xl'} onClick={() => upload()}>SEND</h1>

					{uploadedPicture.map((picture) => {
						return (
								<p key={picture}>{picture}</p>
						)
					})}
					<div className={'mt-16'}>
						<h1 className={'text-2xl mt-10'}>Milestone List</h1>

						{milestoneList.map((milestone) => {
							return (
									<div>
										<p>{milestone.description}</p>
										<div className={'flex flex-row w-full'}>
											{milestone.milestoneMedia.map((media) => {
												return (
															<img className='w-40 h-auto' src={`http://localhost:9000/embrave/${media.link}`}></img>

												)
											})}
										</div>
									</div>
							)
						})}
					</div>
				</div>
			</div>
	)
}
