import Menu from "@/component/menu";
import hero from "../../public/hero.png"

export default function App({ Component, pageProps }) {
	return(
			<div>
				<Menu />
				<div className='w-full min-h-[200px] bg-cover'
						 style={{backgroundImage: `url(${hero.src})`}}>

					<div className='max-w-[1800px] pl-36 lg:pl-80'>
						<p className='text-white text-4xl'>Justin Nydegger</p>
					</div>

				</div>
				<div className='max-w-[1800px] pl-36 lg:pl-80'>
					<Component {...pageProps} />
				</div>
			</div>
	)
}