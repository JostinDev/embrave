import '../app/globals.css';
import Image from "next/image";
import {useEffect, useState} from "react";
import user from "../../public/user.png"

export default function Challenge() {

	const [challenge, setChallenge] = useState([]);


	useEffect(() => {

		fetchChallenge()

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

	async function joinChallenge(id) {

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

	return (
			<div className="h-screen bg-blue-500 pt-20">
				<div className='mx-auto p-10 rounded-md bg-white w-1/2 max-w-2xl'>

					{challenge.map((challenge) => {
						return (
						<div key={challenge.id} className='bg-white border border-solid border-b-gray-400 mb-4'>
							<p>{challenge.title}</p>
							<p>{challenge.description}</p>
							<p>{challenge.category.category}</p>
							<p onClick={() => joinChallenge(challenge.id)} className='text-blue-600 cursor-pointer'>Join the challenge</p>
						</div>
						)})}
				</div>
			</div>
	)
}
