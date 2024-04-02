import Menu from "@/component/menu";
import hero from "../../public/hero.png"
import Image from "next/image";
import logo from "../../public/logo.svg";
import MenuMobile from "@/component/menu-mobile";

export default function App({ Component, pageProps }) {
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
						<p className='text-sand-12 text-hero self-end -mb-6 hidden md:block'>HEJ JUSTIN</p>
					</div>
				</div>
				<div className='max-w-[1800px] px-4 md:pl-36 lg:pl-80 pt-[120px] md:pt-[220px]'>
					<p className='text-sand-12 text-mobile-hero self-end -mb-6 md:hidden'>HEJ JUSTIN</p>
					<Component {...pageProps} />
				</div>
			</div>
	)
}