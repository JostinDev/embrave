import '../app/globals.css';
import {useEffect, useState} from "react";
import Link from "next/link";
import ChallengeCard from "@/component/challengeCard";

export default function Challenge() {
	const [room, setRoom] = useState([]);

	useEffect(() => {
		fetchRooms()
	}, []);

	const fetchRooms = async () => {
		try {
			const response = (await fetch('/api/room'))
			const responseJSON = await response.json();

			for (const room of responseJSON) {
				console.log(room.room.id)
				const streak = (await fetch(`/api/room/streak/${room.room.id}`))
				const streakResponse = await streak.json();
				room.streak = streakResponse;
			}
			setRoom(responseJSON)
			console.log('GET ALL ROOMS : ' , responseJSON)

		} catch (error) {
			console.error(error);
		}
	};

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
			<div className="mt-10">
				<p className='text-sand-12 text-title2 mb-4'>Currently Active Challenges</p>
				<div className='flex flex-wrap gap-4'>
					{room.map((room) => {
						return (
								<Link key={room.room.id} href={`/room/${room.room.id}`}>
									<ChallengeCard
											id={room.room.id}
											challenge={room.room.challenge.title} type={'daily'}
											streak={room.streak} date={room.room.created} >
									</ChallengeCard>
								</Link>
						)})}
				</div>
			</div>
	)
}
