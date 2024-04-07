import '../../app/globals.css';
import {useEffect, useState} from "react";
import {minio} from 'minio'
import {useRouter} from "next/router";
import md5 from "md5";
import Label from "@/component/label";
import Image from "next/image";

export default function Challenge() {

	const [room, setRoom] = useState([]);
	const [challenge, setChallenge] = useState([]);
	const [milestoneList, setMilestoneList] = useState([]);

	const [milestonePicture, setMilestonePicture] = useState([]);
	const [milestoneDescription, setMilestoneDescription] = useState("");
	const [milestoneTitle, setMilestoneTitle] = useState("");

	const [uploadedPicture, setUploadedPicture] = useState([]);

	const [weekday, setWeekday] = useState([]);


	const [milestoneDoneAt, setMilestoneDoneAt] = useState([]);
	const [user, setUser] = useState("");

	const [users, setUsers] = useState([]);

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
			getUsers()
			getRoom()
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
			setMilestoneList(response)
			console.log('GET ALL MILESTONES : ', response)
		});
	};

	const getRoom = async () => {
		const response = (await fetch(`/api/room/${id}`))
		await response.json().then((response) => {
			setRoom(response)
			setChallenge(response.challenge)
			console.log('ROOM : ', response)
			console.log('ROOM CHALLENGE : ', response.challenge)
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

	const getUsers = async () => {

		const response = (await fetch(`/api/user/room/${id}`));

		await response.json().then(response => {
			console.log('List of users : ', response)
			setUsers(response)
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
		formData.append('title', milestoneTitle)
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
	async function manageSelectedPictures(files) {
		console.log(files)
		if(files.length > 4) {
			console.log("Cannot upload more than 4 images per milestones")
			setMilestonePicture(Array.from(files).slice(0, 4));
		} else {
			setMilestonePicture(files)
		}
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


	async function promoteToAdmin(userID) {
		const response = await fetch(`/api/room/${id}/admin/${userID}`, {
			method: "PUT"
		})

		await response.json().then((response) => {
					console.log(response)
				}
		).catch(e => console.log(e));
	}

	async function kickFromRoom(userID) {
		const response = await fetch(`/api/room/1002/kick/1`, {
			method: "DELETE"
		})
		await response.json().then((response) => {
					console.log(response)
				}
		).catch(e => console.log(e));
	}

	async function updateRoomLink() {
		const response = await fetch(`/api/room/${id}/updateLink`, {
			method: "PUT"
		})

		await response.json().then((response) => {
					console.log(response)
				}
		).catch(e => console.log(e));
	}

	function timestampToDate(timestamp) {
		let date = new Date(timestamp);
		return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
	}

	return (
			// TODO Mark a challenge as done
			// TODO show image to be uploaded
			// TODO prevent more than 4 images
			<div className="min-h-screen relative">
				<h1 className='text-large-title text-sand-12 mb-8'>{challenge.title}</h1>

				<div className={'absolute right-0 top-0 flex gap-6 items-center'}>
					<button className={'bg-sand-12 text-sand-3 rounded-lg h-fit p-3 text-body-l-book'}>Share</button>
					<div className={'flex'}>
						{users.map((userRoom, index) => {
							return (
									<img style={{marginLeft: -24 * index}} title={userRoom.user.name} alt={userRoom.user.name}
											 className={'rounded-full h-12 w-12 border-2 border-sand-12'} src={userRoom.user.avatar}/>
							)
						})}
					</div>
				</div>

				<div className={'flex gap-8 mb-14'}>
					<div className={'flex flex-col gap-2'}>
						<p className={'text-body-m-bold'}>Date started:</p>
						<p>{room.created}</p>
					</div>
					<div className={'flex flex-col gap-2'}>
						<p className={'text-body-m-bold'}>Type:</p>
						<Label type={'dailyChallenge'}></Label>
					</div>
				</div>

				<h2 className={'text-title1 mb-4'}>Challenge description</h2>
				<p className={'text-body-l-book mb-14'}>{challenge.description}</p>

				<div className={'max-w-[550px]'}>
					<h2 className={'text-title1 mb-6'}>Your activity</h2>
					<div className={'relative'} id={'milestoneList'}>

						{milestoneList.map((milestone, i, row) => {
							return (
									<div
											className={'milestoneItem flex flex-col '+(i + 1 === row.length ? 'lastMilestone mb-10 ' : 'pb-10 ') + (i === 0 ? 'firstMilestone ' : '')}>

										<div className={'metadata pl-16 flex justify-between'}>
											<Label type={milestone.ticked ? 'milestone' : 'update'}></Label>
											<p className={'text-body-s-book text-sand-11'}>{timestampToDate(milestone.timestamp)}</p>
										</div>

										<div className={'metabody'}>
											<div className={'flex items-center gap-4'}>
												<img title={milestone.user.name} alt={milestone.user.name}
														 className={'profilePicture rounded-full h-12 w-12 border-2 border-sand-12'}
														 src={milestone.user.avatar}/>
												<p className={'text-title2'}>{milestone.title ? milestone.title : milestone.user.name + ' has set the challenge as done'}</p>
											</div>
											<p className={'text-body-l-book pl-16'}>
												{milestone.description}
											</p>

											<div className={'flex flex-row w-full pl-16'}>
												{milestone.milestoneMedia.map((media) => {
													return (
															<img className='w-40 h-auto' src={`http://localhost:9000/embrave/${media.link}`}></img>
													)
												})}
											</div>

											<div className={'ml-16'}>
												{user.id === milestone.user.id ?
														<p onClick={() => deleteMilestone(milestone.id)}
															 className={'font-bold text-red-700 cursor-pointer'}>Delete the milestone</p>
														: ""}
											</div>
										</div>
									</div>
							)
						})}
					</div>

				</div>
				<h1 onClick={() => updateRoomLink()} className='cursor-pointer mb-10 text-2xl'>Generate new link</h1>
				<a className={'block mb-4'} href={"http://localhost:8080/api/room/join/" + room.link}>Room link :
					http://localhost:8080/api/room/join/{room.link}</a>

				<div>
					<h1 className='mb-10 text-2xl'>Users in room : </h1>

					{users.map((userRoom) => {
						return (
								<div className={'mb-6'}>
									<img src={userRoom.user.avatar}/>
									<p>{userRoom.user.name}</p>
									<p className={'text-green-600'}>{userRoom.admin ? 'Admin' : 'Not admin'}</p>
									<p onClick={() => promoteToAdmin(userRoom.user.id)}
										 className={'cursor-pointer text-green-600'}>{userRoom.user.id !== user.id && !userRoom.admin ? 'Promote to admin' : ''}</p>
									<p onClick={() => kickFromRoom(userRoom.user.id)}
										 className={'cursor-pointer text-green-600'}>{userRoom.user.id !== user.id && !userRoom.admin ? 'Kick from the room' : ''}</p>
									<p onClick={() => kickFromRoom(userRoom.user.id)} className={'cursor-pointer text-green-600'}>Kick
										from the room</p>
								</div>
						)
					})}
				</div>

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
							 onChange={(e) => manageSelectedPictures(e.target.files)}/>
				<img className={'w-40'} id={'pic'} src={''}></img>

				<div className={'flex flex-col w-fit'}>
					<label htmlFor={'milestoneTitle'}>Title</label>
					<input
							className={'border border-b-gray-400'} id={'milestoneTitle'} type={'text'}
							onChange={(e) => setMilestoneTitle(e.target.value)}/>

					<label htmlFor={'milestoneDescription'}>Description</label>
					<input
							className={'border border-b-gray-400'} id={'milestoneDescription'} type={'text'}
							onChange={(e) => setMilestoneDescription(e.target.value)}/>
				</div>


				<h1 className={'text-xl'} onClick={() => upload()}>SEND</h1>

				{uploadedPicture.map((picture) => {
					return (
							<p key={picture}>{picture}</p>
					)
				})}
				<h1 onClick={() => leaveRoom()} className='mb-10 text-2xl font-bold text-red-700 cursor-pointer'>Quit the
					room</h1>

			</div>
	)
}
