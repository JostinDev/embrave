import '../app/globals.css';
import {useEffect, useState} from "react";

export default function Challenge() {

	const [challenge, setChallenge] = useState([]);
	const [room, setRoom] = useState([]);

	useEffect(() => {
		fetchChallenge()
		fetchRooms()
	}, []);


	const fetchChallenge = async () => {
		try {
			const response = (await fetch('/api/challenge'))

			const responseJSON = await response.json();
			setChallenge(responseJSON)

			console.log(responseJSON)

		} catch (error) {
			console.error(error);
		}
	};

	const fetchRooms = async () => {
		try {
			const response = (await fetch('/api/room'))

			const responseJSON = await response.json();
			setRoom(responseJSON)

			console.log('GET ALL ROOMS : ' , responseJSON)

		} catch (error) {
			console.error(error);
		}
	};

	async function createRoom(id) {

		const data = { challenge_id: id};

		try {
			const response = await fetch("api/room", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();
			console.log("Success:", result);
		} catch (error) {
			console.error("Error:", error);
		}
	}

	async function joinRoom(code) {

		const data = { code: code};

		try {
			const response = await fetch("api/room/join", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();
			console.log("Success:", result);
		} catch (error) {
			console.error("Error:", error);
		}
	}

	return (
			<div className="min-h-screen bg-blue-500 pt-20">
				<div className='mx-auto p-10 rounded-md bg-white w-1/2 max-w-2xl'>

					<h1 className='mb-10 text-2xl'>Challenges</h1>

					{challenge.map((challenge) => {
						return (
						<div key={challenge.id} className='bg-white border border-solid border-b-gray-400 mb-4'>
							<p>{challenge.title}</p>
							<p>{challenge.description}</p>
							<p>{challenge.category.category}</p>
							<p onClick={() => createRoom(challenge.id)} className='text-blue-600 cursor-pointer'>Create the challenge</p>
						</div>
						)})}
				</div>

				<div className='mx-auto mt-10 p-10 rounded-md bg-white w-1/2 max-w-2xl'>

					<h1 className='mb-10 text-2xl'>Rooms</h1>

					{room.map((room) => {
						return (
								<div key={room.id} className='bg-white border border-solid border-b-gray-400 mb-4'>
									<p>Room ID : {room.id}</p>
									<p>Room code : {room.code}</p>
									<p>Room link : {room.link}</p>
									<p>Room created : {room.created}</p>
									<p onClick={() => joinRoom(room.code)} className='text-blue-600 cursor-pointer'>Join the room</p>
								</div>
						)})}
				</div>
			</div>
	)
}
