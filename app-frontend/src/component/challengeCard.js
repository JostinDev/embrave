import '../app/globals.css';
import Image from "next/image";
import placeholder from "../../public/challengePlaceholder.png"
import flame from "../../public/flame.svg"
import chevronRight from "../../public/chevron-right.svg"
import Label from "@/component/label";

export default function ChallengeCard(props) {

	function Streak() {
		let streak = props.streak !== 0 && props.streak

		return (
			<div className='relative'>
				{streak ?
						<div className='absolute top-2 left-2 flex gap-1 p-1.5 text-orange-10 bg-orange-4 rounded-md'>
							<Image src={flame} alt={''}></Image>
							<p className='text-body-s-book'>{props.streak}</p>
						</div>
						: ''}
				<Image className='rounded-[10px] pb-3' src={placeholder} alt={''}></Image>
			</div>
		)
	}

	function Tag() {

		let type = props.type

		switch (type) {
			case 'goal':
				return <Label type={'goal'}></Label>
			case 'habit':
				return <Label type={'dailyChallenge'}></Label>
		}
	}

	return (
			<div className="border border-sand-5 p-4 rounded-[26px] bg-sand-2 flex flex-col max-w-[220px] cursor-pointer">

				<Streak/>
				<span className={'mb-4'}>
					<Tag/>
				</span>

				<p className='text-sand-12 text-body-l-medium pb-3'>{props.challenge}</p>

				{props.description ?
						<p className='text-sand-12 text-body-m-book pb-3'>{props.description}</p>
						: ''}

				{props.date ?
						<p className='text-sand-11 text-body-s-book'>Created: {props.date}</p>
						: ''}
				<Image className='self-end' src={chevronRight} alt={''}></Image>
			</div>
	)
}
