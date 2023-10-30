import '../app/globals.css';
import {useEffect, useState} from "react";
import {minio} from 'minio'

export default function Challenge() {

	const [room, setRoom] = useState([]);

	useEffect(() => {
		fetchRooms()
	}, []);


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



	return (
			<div className="min-h-screen bg-blue-500 pt-20">
				<div className='mx-auto mt-10 p-10 rounded-md bg-white w-1/2 max-w-2xl'>
					<h1 className='mb-10 text-2xl'>Rooms</h1>
					{room.map((room) => {
						return (
								<div key={room.id} className='bg-white border border-solid border-b-gray-400 mb-4'>
									<p>Room ID : {room.id}</p>
									<p>Room code : {room.code}</p>
									<a href={"/api/room/join/" + room.link}>Room link : {room.link}</a>
									<p>Room created : {room.created}</p>
								</div>
						)})}
				</div>
			</div>
	)
}
