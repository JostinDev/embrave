import '../app/globals.css';
import Link from 'next/link';
import world from "../../public/world.svg"
import profile from "../../public/profile.svg"
import home from "../../public/home.svg"
import Image from "next/image";
import {useEffect, useState} from "react";
import logout from "../../public/logout.svg";
import {Router} from "next/router";

export default function MenuMobile() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [currentIcon, setCurrentIcon] = useState(home);

	useEffect( () => {
		const handleResize = () => {
			if(window.location.href.includes("explore")) {
				setCurrentIcon(world)
			} else if(window.location.href.includes("profile")) {
				setCurrentIcon(profile)
			} else {
				setCurrentIcon(home)
			}
		};

		initBackdrop()
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	},[]);

	async function initBackdrop() {
		switch (Router.pathname) {
			case "/" :
				setCurrentIcon(home)
				break
			case "/explore" :
				setCurrentIcon(world)
				break
			case "/profile" :
				setCurrentIcon(profile)
				break
		}
	}

	return (
			<div className='fixed z-40 right-8 top-3 flex md:hidden flex-col h-20 cursor-pointer select-none' onClick={() => setIsMenuOpen(!isMenuOpen)}>
				<div className="flex-1 pt-6 pb-3 border border-sand-5 rounded-[26px] flex flex-col gap-8 backdrop-blur-lg w-[83px] bg-white/40">
					<div id="backdropContainerMobile" className="items-center relative flex flex-col gap-3 font-nexa-book text-base leading-[18px]">

						<div id="backdropMobile" className="transition-all -top-2 absolute w-[44px] h-[44px] bg-sand-1 rounded-[10px] border border-sand-5"></div>

						<div id="currentPage" className="z-30 px-4 flex gap-2 items-end ">
							<Image className='pointer-events-none' src={currentIcon} alt={''}></Image>
						</div>

						<div className={'z-30 flex-col ' + (isMenuOpen ? 'flex' : 'hidden')}>

							<Link id="linkHome"
										className={'z-30 py-2 px-5 justify-center ' + (currentIcon === home ? 'hidden' : 'flex')} href="/"
										onClick={() => setCurrentIcon(home)}>
								<Image className='hover:bg-sand-3 transition-all w-12 rounded-[10px] p-2' src={home} alt={''}></Image>
							</Link>

							<Link id="linkExplore"
										className={'z-30 py-2 px-5 justify-center ' + (currentIcon === world ? 'hidden' : 'flex')}
										href="/explore" onClick={() => setCurrentIcon(world)}>
								<Image className='hover:bg-sand-3 transition-all w-12 rounded-[10px] p-2' src={world} alt={''}></Image>
							</Link>

							<Link id="linkProfile"
										className={'z-30 py-2 px-5 justify-center ' + (currentIcon === profile ? 'hidden' : 'flex')}
										href="/profile" onClick={() => setCurrentIcon(profile)}>
								<Image className='hover:bg-sand-3 transition-all w-12 rounded-[10px] p-2' src={profile} alt={''}></Image>
							</Link>

							<form className={'z-30 py-2 px-5 justify-center lg:justify-start'} method="post"
										action={process.env.logoutUrl}>
								<button className="flex h-full items-center text-body-l-book text-sand-12 hover:bg-sand-3 transition-all w-10 rounded-[10px] p-2" type="submit">
									<Image className='' src={logout} alt={''}></Image>
								</button>
							</form>

						</div>
					</div>
				</div>
			</div>
	)
}
