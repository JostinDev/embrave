import Image from 'next/image';

import Label from '@/component/label';
import placeholder from '../../public/challengePlaceholder.png';
import chevronRight from '../../public/chevron-right.svg';
import flame from '../../public/flame.svg';

export default function ChallengeCard(props) {
  function Streak() {
    let streak = props.streak !== 0 && props.streak;

    return (
      <div className="relative">
        {streak ? (
          <div className="absolute left-2 top-2 flex gap-1 rounded-md bg-orange-4 p-1.5 text-orange-10">
            <Image src={flame} alt={''}></Image>
            <p className="text-body-s-book">{props.streak}</p>
          </div>
        ) : (
          ''
        )}
        <Image className="rounded-[10px] pb-3" src={placeholder} alt={''}></Image>
      </div>
    );
  }

  function Tag() {
    let type = props.type;

    switch (type) {
      case 'goal':
        return <Label type={'goal'}></Label>;
      case 'habit':
        return <Label type={'dailyChallenge'}></Label>;
    }
  }

  return (
    <div className="flex max-w-[220px] cursor-pointer flex-col rounded-[26px] border border-sand-5 bg-sand-2 p-4">
      <Streak />
      <span className={'mb-4'}>
        <Tag />
      </span>

      <p className="text-body-l-medium pb-3 text-sand-12">{props.challenge}</p>

      {props.description ? (
        <p className="text-body-m-book pb-3 text-sand-12">{props.description}</p>
      ) : (
        ''
      )}

      {props.date ? <p className="text-body-s-book text-sand-11">Created: {props.date}</p> : ''}
      <Image className="self-end" src={chevronRight} alt={''}></Image>
    </div>
  );
}
