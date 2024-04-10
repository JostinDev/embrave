import '../app/globals.css';
import Image from "next/image";
import {useEffect, useState} from "react";
import user from "../../public/user.png"
import Link from "next/link";
import ChallengeCard from "@/component/challengeCard";

export default function Index() {

	const [room, setRoom] = useState([]);
	const [isLogged, setIsLogged] = useState(null);

	useEffect(() => {

		fetchDetails()
		fetchRooms()
	}, []);

	const fetchDetails = async () => {
		try {
			const response = (await fetch('/api/user').then((response)=>{
				if(response.status !== 200) {
					throw new Error(response.status)
				}
			}));
			setIsLogged(true)
		} catch (error) {
			console.error("User not logged in");
			setIsLogged(false)
		}
	};

	const fetchRooms = async () => {
		try {
			const response = (await fetch('/api/room'))
			const responseJSON = await response.json();

			for (const room of responseJSON) {
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

	function HomePage() {
			console.log('isLogged : ', isLogged)
			if(isLogged !== null) {
				if(isLogged) {
					return (
							<div>
								<p className='text-sand-12 text-title2 mb-4'>Currently Active Challenges</p>
								<div className='flex flex-wrap gap-4'>
									{room.map((room) => {
										return (
												<Link key={room.room.id} href={`/room/${room.room.id}`}>
													<ChallengeCard
															id={room.room.id}
															challenge={room.room.challenge.title} type={room.room.challenge.type.type}
															streak={room.streak} date={room.room.created}>
													</ChallengeCard>
												</Link>
										)
									})}
								</div>
							</div>
					)
				} else {
					return (
							<div className={'flex flex-col'}>
								<p className='text-sand-12 text-title2 mb-2'>You are not logged in</p>
								<a className={'bg-sand-12 text-sand-3 rounded-lg h-fit p-3 text-body-l-book max-w-fit'}
									 href={process.env.loginUrl}>
									Login
								</a>
							</div>
					)
				}
			}
		}

	return (
			<div className="min-h-screen relative">
				<HomePage/>
			</div>
	)
}

