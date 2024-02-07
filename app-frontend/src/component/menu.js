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
				await waitForElm('#linkChallenge').then(el => el.click())
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
		console.log("element :",rect.top, rect.right, rect.bottom, rect.left);
		console.log("Container :",rectContainer.top, rectContainer.right, rectContainer.bottom, rectContainer.left);

		let topValue = rect.top - rectContainer.top
		let heightBackdrop = rect.bottom - rect.top

		console.log("Top Value :", topValue)
		console.log("Height backdrop value :", heightBackdrop)

		backdrop.style.top = rect.top - rectContainer.top - heightBackdrop +'px';

	}

	return (
			<div className="absolute left-8 p-5 top-4 border border-white rounded-[14px] bottom-4 flex flex-col gap-8 backdrop-blur-lg w-[255px] bg-gradient-to-br from-white to-[#F9F9F8]/50">

				<div className="flex gap-2 items-center">
					<Image src={logo} alt={''}></Image>
					<h1 className="font-nexa-book text-2xl">Embrave</h1>
				</div>

				<div id="backdropContainer" className="relative flex flex-col gap-4 font-nexa-book text-base leading-[18px]">

					<div id="backdrop" className="absolute w-[215px] h-[44px] bg-[#F0F0EF]/[.52] rounded-xl border border-[#E9E8E6]"></div>

					<div className="menuItem z-10 flex gap-2 items-end">
						<Image src={home} alt={''}></Image>
						<Link id="linkHome" onClick={(e) => placeBackdrop(e.target)} href="/">Home</Link>
					</div>

					<div className="menuItem z-10 flex gap-2 items-end">
						<Image src={world} alt={''}></Image>
						<Link id="linkChallenge" onClick={(e) => placeBackdrop(e.target)} href="/challenge">Challenge</Link>
					</div>

					<div className="menuItem z-10 flex gap-2 items-end">
						<Image src={world} alt={''}></Image>
						<Link id="linkExplore" onClick={(e) => placeBackdrop(e.target)} href="/challenge">Explore</Link>
					</div>

					<div className="menuItem z-10 flex gap-2 items-end">
						<Image src={profile} alt={''}></Image>
						<Link id="linkProfile" onClick={(e) => placeBackdrop(e.target)} href="/challenge">Profile</Link>
					</div>
				</div>

				<FontTest></FontTest>
			</div>
	)
}
