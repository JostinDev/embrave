import '../app/globals.css';
import {useEffect, useState} from "react";

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


	async function createRoom(id) {

		const data = { challenge_id: id};

			const response = await fetch("api/room", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			await response.json().then(response => {
				console.log("Success:", response);
			}).catch(e => {
				console.log("Error:", e);
			});
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
			</div>
	)
}
