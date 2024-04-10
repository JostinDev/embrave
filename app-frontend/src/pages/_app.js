"use client"; // This is a client component 👈🏽

import Menu from "@/component/menu";
import hero from "../../public/hero.png"
import Image from "next/image";
import logo from "../../public/logo.svg";
import MenuMobile from "@/component/menu-mobile";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function App({ Component, pageProps }) {
	const router = useRouter()
	const [showGreetings, setShowGreetings] = useState(true);
	const [name, setName] = useState('');

	useEffect( () => {
		switch (router.pathname) {
			case "/room/[id]" :
				setShowGreetings(false)
				break
		}
		fetchUser()

	},[]);

	const fetchUser = async () => {
		try {
			const response = (await fetch('/api/user'));
			const user = await response.json();
			setName(user.name)
		} catch (error) {
			console.error("User not logged in");
		}
	};

	return(
			<div>
				<div className='fixed z-20 left-8 top-4 bottom-8 flex flex-col'>
					<div className="flex gap-4 items-center mb-8">
						<Image src={logo} alt={''}></Image>
						<h1 className="hidden lg:block text-large-title text-sand-12">Embrave</h1>
					</div>
				</div>
				<Menu />
				<MenuMobile />
				<div className='fixed w-full min-h-[105px] md:min-h-[191px] bg-cover flex flex-col z-10' style={{backgroundImage: `url(${hero.src})`}}>
					<div className='max-w-[1800px] pl-36 lg:pl-80 flex-1 flex'>
						<p className={'text-sand-12 text-hero self-end -mb-4 hidden md:block ' + (showGreetings ? '' : 'md:hidden')}>HEJ {name}</p>
					</div>
				</div>
				<div className='max-w-[1800px] px-4 md:pl-36 lg:pl-80 pt-[120px] md:pt-[220px] relative'>
					<p className={'text-sand-12 text-mobile-hero self-end -mb-6 md:hidden ' + (showGreetings ? '' : 'hidden')}>HEJ {name}</p>
					<Component {...pageProps} />
				</div>
			</div>
	)
}