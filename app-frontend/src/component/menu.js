import '../app/globals.css';
import Link from 'next/link';
import world from "../../public/world.svg"
import profile from "../../public/profile.svg"
import home from "../../public/home.svg"
import logout from "../../public/logout.svg"
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {act} from "react-dom/test-utils";

export default function Menu() {
	const router = useRouter()

	const [previousActive, setPreviousActive] = useState('');

	useEffect( () => {
		initBackdrop()
	},[]);

	async function initBackdrop() {
		switch (router.pathname) {
			case "/" :
				await waitForElm('#linkHome').then(el => placeBackdrop(el))
				break
			case "/challenge" :
				await waitForElm('#linkChallenge').then(el => placeBackdrop(el))
				break
			case "/explore" :
				await waitForElm('#linkExplore').then(el => placeBackdrop(el))
				break
			case "/profile" :
				await waitForElm('#linkProfile').then(el => placeBackdrop(el))
				break
		}
	}

	async function hoverState(active, className) {
		if(active.id !== previousActive) {
			active.classList.remove(className)
			if(previousActive) {
				await waitForElm('#'+previousActive).then(el =>{
					el.classList.add(className)
				})
			}
			setPreviousActive(active.id);
		}
	}

	function waitForElm(selector) {
		return new Promise(resolve => {
			if (document.querySelector(selector)) {
				return resolve(document.querySelector(selector));
			}

			const observer = new MutationObserver(mutations => {
				if (document.querySelector(selector)) {
					observer.disconnect();
					resolve(document.querySelector(selector));
				}
			});

			// If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		});
	}

	function placeBackdrop(item) {
		const backdrop = document.querySelector('#backdrop')
		const backdropContainer = document.querySelector('#backdropContainer')

		let rect = item.getBoundingClientRect();
		let rectContainer = backdropContainer.getBoundingClientRect();

		let topValue = rect.top - rectContainer.top

		backdrop.style.top = topValue +'px';

		hoverState(item,'hover:bg-sand-4')

	}

	return (
			<div className='fixed z-40 left-8 hidden top-32 bottom-8 md:flex flex-col'>
				<div
						className="transition-[width] flex-1 px-4 pt-6 border border-sand-5 rounded-[26px] flex flex-col gap-8 backdrop-blur-lg w-[83px] lg:w-[255px] bg-white/40">
					<div id="backdropContainer"
							 className="items-center lg:items-start relative flex flex-col gap-4 font-nexa-book text-base leading-[18px]">

						<div id="backdrop"
								 className="pointer-events-none z-30 transition-all absolute w-[48px] lg:w-[221px] h-[44px] bg-sand-1 rounded-[10px] border border-sand-5">
						</div>

						<Link id="linkHome" className="z-30 justify-center lg:justify-start flex gap-2 items-end lg:pl-2 w-full rounded-[10px] transition-all hover:bg-sand-4 py-2"
									onClick={(e) => placeBackdrop(e.target)} href="/">
							<Image className='pointer-events-none' src={home} alt={''}></Image>
							<span className='pointer-events-none hidden lg:flex h-full items-center text-body-l-book text-sand-12'>Home</span>
						</Link>

						<Link id="linkChallenge" className="z-30 justify-center lg:justify-start flex gap-2 items-end lg:pl-2 w-full rounded-[10px] transition-all hover:bg-sand-4 py-2"
									onClick={(e) => placeBackdrop(e.target)} href="/challenge">
							<Image className='pointer-events-none' src={world} alt={''}></Image>
							<span className='pointer-events-none hidden lg:flex h-full items-center text-body-l-book text-sand-12'>Challenge</span>
						</Link>

						<Link id="linkExplore" className="z-30 justify-center lg:justify-start flex gap-2 items-end lg:pl-2 w-full rounded-[10px] transition-all hover:bg-sand-4 py-2"
									onClick={(e) => placeBackdrop(e.target)} href="/explore">
							<Image className='pointer-events-none' src={world} alt={''}></Image>
							<span className='pointer-events-none hidden lg:flex h-full items-center text-body-l-book text-sand-12'>Explore</span>
						</Link>

						<Link id="linkProfile" className="z-30 justify-center lg:justify-start flex gap-2 items-end lg:pl-2 w-full rounded-[10px] transition-all hover:bg-sand-4 py-2"
									onClick={(e) => placeBackdrop(e.target)} href="/profile">
							<Image className='pointer-events-none' src={profile} alt={''}></Image>
							<span className='pointer-events-none hidden lg:flex h-full items-center text-body-l-book text-sand-12'>Profile</span>
						</Link>
					</div>

					<div className={'z-30 lg:pl-2 mt-auto mb-8'}>
						<form className={'flex justify-center lg:justify-start'}  method="post" action={process.env.logoutUrl}>
							<button className="flex gap-2 h-full items-center text-body-l-book text-sand-12"
											type="submit"><Image src={logout} alt={''}></Image><span className={'hidden lg:block'}>Log out</span>
							</button>
						</form>
					</div>

				</div>
			</div>
	)
}
