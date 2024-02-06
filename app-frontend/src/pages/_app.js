import  { AppProps } from 'next/app'
import Menu from "@/component/menu";
import Image from "next/image";
import hero from "../../public/hero.png"

export default function App({ Component, pageProps }) {
	return(
			<div>
				<Menu />
				<Image src={hero} alt={''}></Image>
				<Component {...pageProps} />
			</div>
	)
}