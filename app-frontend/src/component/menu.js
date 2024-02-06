import '../app/globals.css';
import Link from 'next/link';
import FontTest from "@/component/fontTest";

export default function Menu() {

	return (
			<div className="absolute left-8 p-5 top-4 border border-white rounded-[14px] bottom-4 flex flex-col gap-8 w-[255px] bg-gradient-to-br from-white to-[#F9F9F8]/50">
				<Link className="font-nexa-regular" href="/">Home</Link>
				<Link className="font-nexa-regular" href="/challenge">Challenge</Link>
				<FontTest></FontTest>
			</div>
	)
}
