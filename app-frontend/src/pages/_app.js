import  { AppProps } from 'next/app'
import Menu from "@/component/menu";

export default function App({ Component, pageProps }) {
	return(
			<div>
				<Menu />
				<Component {...pageProps} />
			</div>
	)
}