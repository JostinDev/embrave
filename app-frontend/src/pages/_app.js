import Menu from "@/component/menu";
import hero from "../../public/hero.png"

export default function App({ Component, pageProps }) {
	return(
			<div>
				<Menu />
				<div className='fixed w-full min-h-[275px] bg-cover flex flex-col' style={{backgroundImage: `url(${hero.src})`}}>
					<div className='max-w-[1800px] pl-36 lg:pl-80 flex-1 flex'>
						<p className='text-sand-12 text-hero self-end -mb-6'>HEJ JUSTIN</p>
					</div>
				</div>
				<div className='max-w-[1800px] pl-36 lg:pl-80 pt-[275px]'>
					<Component {...pageProps} />
				</div>
			</div>
	)
}