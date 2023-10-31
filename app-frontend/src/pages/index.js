import '../app/globals.css';
import Image from "next/image";
import {useEffect, useState} from "react";
import user from "../../public/user.png"
import md5 from 'md5';

export default function Index() {

	const [email, setEmail] = useState('Log in to see your profile...');
	const [name, setName] = useState('John');
	const [avatar, setAvatar] = useState(user);

	const [milestonePicture, setMilestonePicture] = useState([]);
	const [milestoneDescription, setMilestoneDescription] = useState();

	const [uploadedPicture, setUploadedPicture] = useState([]);

	const [milestoneList, setMilestoneList] = useState([]);

	let pictureLink = [];

	useEffect(() => {

		fetchDetails()
		fetchChallenge()
		fetchMilestone()


	}, []);

	const fetchDetails = async () => {
		try {
			const response = (await fetch('/api/user'));

			const user = await response.json();
			setEmail(user.email)
			setName(user.name)
			setAvatar(user.avatar)

		} catch (error) {
			console.error("User not logged in");
		}
	};

	const fetchChallenge = async () => {
		try {
			const response = (await fetch('/api/challenge'));

			const challenge = await response.json();
			console.log('Challenge : ', challenge);

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
		await saveMilestone(552)
	}

	async function saveMilestone(milestoneID) {
		console.log('SAVE MILESTONE')
		console.log(pictureLink)

		const formData = new FormData()

		formData.append('description', milestoneDescription)
		formData.append('roomID', "552")
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


	const fetchMilestone = async () => {
		try {
			const response = (await fetch('/api/milestone/552'))

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

	return (
			<div className="h-screen bg-blue-500 pt-20">
				<div className='mx-auto p-10 rounded-md bg-white w-1/2 max-w-2xl'>
					<p className='text-3xl mb-10'>Enterprise Spring boot Gateway App</p>

					<div className='flex gap-4 items-center'>
						<Image className='rounded-full' width={100} height={100} alt={''} src={avatar}/>
						<div>
							<p className='text-xl'>{name}</p>
							<p className='text-lg'>{email}</p>
						</div>
					</div>

					<div className='flex gap-4 mt-10'>
						<a className='bg-blue-500 hover:bg-blue-700 px-8 py-2 text-xl text-white rounded-md'
							 href={process.env.loginUrl}>
							Login
						</a>
						<form method="post" action={process.env.logoutUrl}>
							<button className="bg-blue-500 hover:bg-blue-700 px-8 py-2 text-xl text-white rounded-md"
											type="submit">Log Out
							</button>
						</form>
					</div>

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

										{milestone.milestoneMedia.map((media) => {
											return (
													<img src={`http://localhost:9000/embrave/${media.link}`}></img>
											)
										})}
									</div>
							)
						})}
					</div>
				</div>
			</div>
	)
}
