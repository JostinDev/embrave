import '../app/globals.css';
import Image from "next/image";
import {useEffect, useState} from "react";
import user from "../../public/user.png"
import {Minio} from "@/utils/Minio";

export default function Index() {

	const [email, setEmail] = useState('Log in to see your profile...');
	const [name, setName] = useState('John');
	const [avatar, setAvatar] = useState(user);


	useEffect(() => {

		fetchDetails()
		fetchChallenge()

	}, []);

	const fetchDetails = async () => {
		try {
			const response = (await fetch('/api/user'));

			const user = await response.json();
			setEmail(user.email)
			setName(user.name)
			setAvatar(user.avatar)

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


	function savePhoto(inp) {
		Minio.upload(inp);
	}

	return (
			<div className="h-screen bg-blue-500 pt-20">
				<div className='mx-auto p-10 rounded-md bg-white w-1/2 max-w-2xl'>
					<p className='text-3xl mb-10'>Enterprise Spring boot Gateway App</p>

					<div className='flex gap-4 items-center'>
						<Image className='rounded-full' width={100} height={100} alt={''} src={avatar}/>
						<div>
							<p className='text-xl'>{name}</p>
							<p className='text-lg'>{email}</p>
						</div>
					</div>

          <div className='flex gap-4 mt-10'>
            <a className='bg-blue-500 hover:bg-blue-700 px-8 py-2 text-xl text-white rounded-md'
               href={process.env.loginUrl}>
              Login
            </a>
						<form method="post" action={process.env.logoutUrl}>
							<button className="bg-blue-500 hover:bg-blue-700 px-8 py-2 text-xl text-white rounded-md" type="submit">Log Out</button>
						</form>
          </div>


					<h1 className={'text-2xl mt-10'}>upload</h1>
					<input id="image-file" type="file" multiple onChange={(e) => savePhoto(e.target.files[0])}/>
				</div>
			</div>
	)
}
