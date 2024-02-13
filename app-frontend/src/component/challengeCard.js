import '../app/globals.css';
import Image from "next/image";
import placeholder from "../../public/challengePlaceholder.png"
import flame from "../../public/flame.svg"
import chevronRight from "../../public/chevron-right.svg"

export default function ChallengeCard(props) {

	return (
			<div className="border border-sand-5 p-4 rounded-[26px] bg-sand-2 flex flex-col max-w-[220px] cursor-pointer">

				<div className='relative'>
					{props.streak !== 0 ?
							<div className='absolute top-2 left-2 flex gap-1 p-1.5 text-orange-10 bg-orange-4 rounded-md'>
								<Image src={flame} alt={''}></Image>
								<p className='text-body-s-book'>{props.streak}</p>
							</div>
							:''}
					<Image className='rounded-[10px] pb-3' src={placeholder} alt={''}></Image>
				</div>

				{props.id % 2 === 0
						? <p className='text-body-s-book mb-4 p-1.5 rounded-lg bg-sky-3 text-sky-11 w-fit'>Daily Challenge</p>
						: <p className='text-body-s-book mb-4 p-1.5 rounded-lg bg-crimson-3 text-crimson-11 w-fit'>Goal Challenge</p>
				}

				<p className='text-sand-12 text-body-l-medium pb-3'>{props.challenge}</p>
				<p className='text-sand-11 text-body-s-book'>Started: {props.date}</p>
				<Image className='self-end' src={chevronRight} alt={''}></Image>
			</div>
	)
}
