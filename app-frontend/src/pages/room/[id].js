import '../../app/globals.css';
import {useEffect, useState} from "react";
import {minio} from 'minio'
import {useRouter} from "next/router";
import md5 from "md5";

export default function Challenge() {

	const [room, setRoom] = useState([]);
	const [milestoneList, setMilestoneList] = useState([]);

	const [milestonePicture, setMilestonePicture] = useState([]);
	const [milestoneDescription, setMilestoneDescription] = useState("");

	const [uploadedPicture, setUploadedPicture] = useState([]);

	const [weekday, setWeekday] = useState([]);


	const [milestoneDoneAt, setMilestoneDoneAt] = useState([]);
	const [user, setUser] = useState("");

	const router = useRouter()
	const {id} = router.query

	let pictureLink = [];

	useEffect(() => {

		datePicker()

		if (router.isReady) {
			const {id} = router.query;
			if (!id) return null;
			fetchMilestone()
			fetchMilestoneTime()
			getUser()
		}
		console.log(id)
		console.log(router.query)

	}, [router.isReady]);


	const datePicker = () => {

		const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

		const now = new Date();
		const day = now.getDay();
		console.log(day)

		let today = weekday[day];
		console.log(today)

		const reorderArr = (i, arr) => {
			return [...arr.slice(i), ...arr.slice(0, i)];
		}

		const reorderedArr = reorderArr(0, weekday);
		console.log(reorderedArr)

		let yourDate = new Date()
		const offset = yourDate.getTimezoneOffset()
		yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))


		let weekDate = []
		for (let i = 0; i < 7; i++) {
			weekDate[i] = new Date(yourDate.getTime() - (offset * 60 * 1000) - ((1000 * 60 * 60 * 24) * i)).toISOString().split('T')[0];
		}

		setWeekday(weekDate);

	}


	function getDayName(date = new Date(), locale = 'en-US') {
		return date.toLocaleDateString(locale, {weekday: 'long'});
	}


	const fetchMilestone = async () => {

		const response = (await fetch(`/api/milestone/${id}`))

		await response.json().then((response) => {
			console.log(response)
			// TODO get user details and check if milestone can be deleted
			setMilestoneList(response)
			console.log('GET ALL MILESTONES : ', response)
		});
	};

	const getUser = async () => {

			const response = (await fetch('/api/user'));

			await response.json().then(response => {
				console.log('CONNECTED USER : ', response)
				setUser(response)
			return response;
			}).catch(e => {return e});
	};

	const fetchMilestoneTime = async () => {
		try {
			const response = (await fetch(`/api/milestone/time/${id}`))
			await response.json().then((response) => {

				console.log('THE RESPONSE :', response);

				let yourDate = new Date()
				const offset = yourDate.getTimezoneOffset()
				yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
				console.log(yourDate.getTime())

				response.forEach((date, i) => {
					let test = new Date(response[i]);
					let newDate = new Date(test.getTime() - (offset * 60 * 1000))
					console.log(newDate)
					response[i] = newDate.toISOString().split('T')[0]
				});

				setMilestoneDoneAt(response)
				console.log('THE RESPONSE :', response);
			});


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

	async function saveMilestone() {
		console.log(pictureLink)
		console.log('FOR MILESTONE : ', id)

		const formData = new FormData()


		formData.append('description', milestoneDescription)
		formData.append('roomID', id)
		formData.append('files', pictureLink)

		const response = await fetch("/api/milestone", {
			method: 'POST',
			body: formData
		});

		await response.json().then((response) => {
					console.log(response)
				}
		);
	}


	async function saveTickedMilestone(isTicked, day) {

		const data = {milestone_ticked: isTicked, milestone_doneAt: day};

		await fetch(`/api/milestone/ticked/${id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
	}

	async function deleteMilestone(milestoneID) {
		await fetch(`/api/milestone/${milestoneID}`, {
			method: "DELETE"
		}).then(response => {console.log(response)})
				.catch(e => {console.log(e)})
	}

	async function leaveRoom() {
		await fetch(`/api/room/${id}`, {
			method: "DELETE"
		}).then(response => {console.log(response)})
				.catch(e => {console.log(e)})
	}


	return (
			// TODO display the link, allow the admin to generate a new one
			// TODO Let admins promote other users to admin
			// TODO Quit a room
			// TODO Mark a challenge as done
			<div className="min-h-screen bg-blue-500 pt-20">
				<div className='mx-auto mt-10 p-10 rounded-md bg-white w-1/2 max-w-2xl'>
					<h1 className='mb-10 text-2xl'>Post milestone</h1>

					<div className='flex flex-row-reverse gap-2'>
						{weekday.map((day) => {
							return (
									<p onClick={() => saveTickedMilestone(milestoneDoneAt.includes(day), day)}
										 className={`cursor-pointer text-white  rounded-full p-2 ${milestoneDoneAt.includes(day) ? "bg-amber-400" : "bg-blue-500"} `}>{getDayName(new Date(day))}</p>
							)
						})}
					</div>

					<h1 className={'text-2xl mt-10'}>Milestone</h1>

					{/* TODO only allow 4 pictures to be uploaded */}
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
					<h1 onClick={() => leaveRoom()} className='mb-10 text-2xl font-bold text-red-700 cursor-pointer'>Quit the room</h1>

					<div className={'mt-16'}>
						<h1 className={'text-2xl my-10'}>Milestone List</h1>

						{milestoneList.map((milestone) => {
							return (
									<div className={'mb-10'}>
										<div className={'flex items-center mb-4'}>
											<img className={'rounded-full'} src={milestone.user.avatar}/>
											<div className={'ml-4'}>
												<p>{milestone.user.name}</p>
												<p>{milestone.timestamp}</p>
												{user.id === milestone.user.id ?
														<p onClick={()=> deleteMilestone(milestone.id)} className={'font-bold text-red-700 cursor-pointer'}>Delete the milestone</p>
														: ""}

											</div>
										</div>
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
