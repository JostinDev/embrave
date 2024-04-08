import '../app/globals.css';
import calendarBlue from "../../public/calendarBlue.svg"
import calendarPurple from "../../public/calendarPurple.svg"
import flagGreen from "../../public/flagGreen.svg"
import globeCrimson from "../../public/globeCrimson.svg"
import Image from "next/image";
import {useEffect, useState} from "react";

export default function Label(props) {
	const [style, setStyle] = useState('');
	const [icon, setIcon] = useState('');
	const [text, setText] = useState('');

	useEffect(() => {
		console.log(props.type)
		switch (props.type) {
			case 'dailyChallenge':
				setStyle('bg-sky-3 text-sky-11')
				setIcon(calendarBlue)
				setText('Daily Challenge')
				break
			case 'update':
				setStyle('bg-purple-3 text-purple-11')
				setIcon(calendarPurple)
				setText('Update')
				break
			case 'milestone':
				setStyle('bg-jade-3 text-jade-11')
				setIcon(flagGreen)
				setText('Milestone')
				break
			case 'goal':
				setStyle('bg-crimson-3 text-crimson-11')
				setIcon(globeCrimson)
				setText('Goal Challenge')
				break
		}
	}, []);


	return (
			<div className={'flex gap-1 items-center p-1.5 rounded-lg h-fit w-fit ' + style}>
				<Image alt = '' src={icon}/>
				<p className={'text-body-s-book'}>{text}</p>
			</div>
	)
}
