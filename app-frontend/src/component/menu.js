import '../app/globals.css';
import Link from 'next/link';
import FontTest from "@/component/fontTest";
import logo from "../../public/logo.svg"
import world from "../../public/world.svg"
import profile from "../../public/profile.svg"
import home from "../../public/home.svg"
import Image from "next/image";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Menu() {
	const router = useRouter()


	useEffect( () => {
		initBackdrop()
	},[]);

	async function initBackdrop() {
		switch (router.pathname) {
			case "/" :
				await waitForElm('#linkHome').then(el => el.click())
				break
			case "/challenge" :
				console.log("challenge selected")
				await waitForElm('#linkChallenge').then(el => el.click())
				break
			case "/explore" :
				await waitForElm('#explore').then(el => el.click())
				break
			case "/profile" :
				await waitForElm('#linkChallenge').then(el => el.click())
				break
		}
	}

	function waitForElm(selector) {
		console.log(selector)
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
		let rectBackdrop = backdrop.getBoundingClientRect();

		let topValue = rect.top - rectContainer.top
		let heightBackdrop = rectBackdrop.bottom - rectBackdrop.top

		backdrop.style.top = topValue - heightBackdrop / 6 +'px';
	}

	return (
			<div className='fixed z-20 left-8 top-8 bottom-8 flex flex-col'>
				<div className="flex gap-4 items-center mb-8">
					<Image src={logo} alt={''}></Image>
					<h1 className="hidden lg:block text-large-title text-sand-12">Embrave</h1>
				</div>
				<div className="transition-[width] flex-1 px-4 pt-6 border border-sand-5 rounded-[26px] flex flex-col gap-8 backdrop-blur-lg w-[83px] lg:w-[255px] bg-white/40">
					<div id="backdropContainer" className="items-center lg:items-start relative flex flex-col gap-6 font-nexa-book text-base leading-[18px]">

						<div id="backdrop" className="transition-all absolute w-[44px] lg:w-[223px] h-[44px] bg-sand-1 rounded-[10px] border border-sand-5"></div>

						<Link id="linkHome" className="z-30 flex gap-2 items-end lg:pl-2" onClick={(e) => placeBackdrop(e.target)} href="/">
							<Image className='pointer-events-none' src={home} alt={''}></Image>
							<span className='hidden lg:flex h-full items-center text-body-l-book text-sand-12'>Home</span>
						</Link>

						<Link id="linkChallenge" className="z-30 flex gap-2 items-end lg:pl-2" onClick={(e) => placeBackdrop(e.target)} href="/challenge">
							<Image src={world} alt={''}></Image>
							<span className='hidden lg:flex h-full items-center text-body-l-book text-sand-12'>Challenge</span>
						</Link>

						<Link id="linkExplore" className="z-30 flex gap-2 items-end lg:pl-2" onClick={(e) => placeBackdrop(e.target)} href="/explore">
							<Image src={world} alt={''}></Image>
							<span className='hidden lg:flex h-full items-center text-body-l-book text-sand-12'>Explore</span>
						</Link>

						<Link id="linkProfile" className="z-30 flex gap-2 items-end lg:pl-2" onClick={(e) => placeBackdrop(e.target)} href="/">
							<Image src={profile} alt={''}></Image>
							<span className='hidden lg:flex h-full items-center text-body-l-book text-sand-12'>Profile</span>
						</Link>
					</div>
				</div>

			</div>
	)
}
