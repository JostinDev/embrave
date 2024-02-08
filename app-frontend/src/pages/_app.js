import Menu from "@/component/menu";
import Image from "next/image";
import hero from "../../public/hero.png"

export default function App({ Component, pageProps }) {
	return(
			<div>
				<Menu />
				<div className='w-full min-h-[200px] bg-cover'
						 style={{backgroundImage: `url(${hero.src})`}}>

					<div className="mx-auto container">
						<p className='text-white text-4xl'>Justin Nydegger</p>
					</div>

				</div>
				<Component {...pageProps} />
			</div>
	)
}