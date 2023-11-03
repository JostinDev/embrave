import '../app/globals.css';
import Link from 'next/link';

export default function Menu() {


	return (
			<div className="flex gap-4 w-full h-24 bg-white">
				<Link href="/">Home</Link>
				<Link href="/challenge">Challenge</Link>
			</div>
	)
}
