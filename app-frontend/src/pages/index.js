import '../app/globals.css';
import Image from "next/image";
import {useEffect, useState} from "react";
import user from "../../public/user.png"
import md5 from 'md5';

export default function Index() {

	const [email, setEmail] = useState('Log in to see your profile...');
	const [name, setName] = useState('John');
	const [avatar, setAvatar] = useState(user);
	const [points, setPoints] = useState(0);

	const [countChallenge, setCountChallenge] = useState(0);
	const [countMilestone, setCountMilestone] = useState(0);
	const [countUser, setCountUser] = useState(0);
	const [countRoom, setCountRoom] = useState(0);




	useEffect(() => {

		fetchDetails()
		fetchChallenge()
		getStats()

	}, []);

	const fetchDetails = async () => {
		try {
			const response = (await fetch('/api/user'));

			const user = await response.json();
			setEmail(user.email)
			setName(user.name)
			setAvatar(user.avatar)
			setPoints(user.points)

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

	async function saveUser() {

		const data = { username: name};

		const response = await fetch("/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		await response.json().then((response) => {
					console.log(response)
				}
		);

	}

	async function getStats() {

		(await fetch('/api/challenge/count')).json().then(response => {
			setCountChallenge(response)
		});

		(await fetch('/api/room/count')).json().then(response => {
			setCountRoom(response)
		});

		(await fetch('/api/user/count')).json().then(response => {
			setCountUser(response)
		});

		(await fetch('/api/milestone/count')).json().then(response => {
			setCountMilestone(response)
		});
	}


	return (
			<div className="h-screen bg-blue-500 pt-20">
				<div className='mx-auto p-10 rounded-md bg-white w-1/2 max-w-2xl'>
					<p className='text-3xl mb-10'>Embrave</p>

					<div className={'my-4'}>
						<p className='text-2xl mb-4'>Some stats : </p>
						<p className='text-xl'>Challenge count : {countChallenge}</p>
						<p className='text-xl'>Room count : {countRoom}</p>
						<p className='text-xl'>User count : {countUser}</p>
						<p className='text-xl'>Milestone count : {countMilestone}</p>
					</div>

					<div className='flex gap-4 items-center'>
						<Image className='rounded-full' width={100} height={100} alt={''} src={avatar}/>
						<div>
							<p className='text-xl'>{name}</p>
							<input onChange={(event) => setName(event.target.value)} className={'border-2 border-blue-500 '} value={name}/>
							<p className='text-lg'>{email}</p>
							<p className='text-lg'>{points}</p>
						</div>
					</div>
					<p onClick={() => saveUser()} className={'cursor-pointer'}>Save new username</p>

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
				</div>
			</div>
	)
}

