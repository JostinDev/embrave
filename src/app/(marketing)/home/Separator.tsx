import Image from 'next/image';

import separator from '@/app/(marketing)/home/images/separator.svg';

export default function Separator() {
  return <Image className="mx-auto my-24 md:my-32 lg:my-44" src={separator} alt="" />;
}
