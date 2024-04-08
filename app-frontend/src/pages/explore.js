import '../app/globals.css';
import {useEffect, useState} from "react";
import ChallengeCard from "@/component/challengeCard";
import Link from "next/link";

export default function Challenge() {

	const [challenge, setChallenge] = useState([]);

	useEffect(() => {
		fetchChallenge()
	}, []);



	const fetchChallenge = async () => {
		try {
			const response = (await fetch('/api/challenge'))

			const responseJSON = await response.json();


			console.log(responseJSON)

			const sortedData = sortByCategory(responseJSON);
			console.log(sortedData);

			setChallenge(sortedData)

			console.log(typeof sortedData)


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

	function sortByCategory(data) {
		const sortedData = {};

		data.forEach(item => {
			const category = item.category.category;
			if (!sortedData[category]) {
				sortedData[category] = [];
			}
			sortedData[category].push(item);
		});

		return sortedData;
	}

	return (
			<div className="min-h-screen relative">
				<h1 className='text-large-title mb-8'>Challenges</h1>

				{Object.keys(challenge).map((category, i) => (
						<div key={i}>
							<h2 className={'text-title1 mb-4'}>{category}</h2>
							<div key={challenge.id} className='flex flex-wrap gap-4 mb-8'>
							{challenge[category].map((challenge, i) => {
								return (
										<div key={i} onClick={() => createRoom(challenge.id)}>
											<ChallengeCard
													challenge={challenge.title}
													description={challenge.description}
													type={challenge.type.type}>
											</ChallengeCard>
										</div>

								)})}
							</div>
						</div>
				))}
			</div>
	)
}
