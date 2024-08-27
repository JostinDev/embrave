import Balance from '@/app/(app)/profile/Balance';
import ProfileCard from '@/app/(app)/profile/ProfileCard';

type CreditsProps = {
  credits: number;
  isPremium: boolean;
};

export default async function Credits(props: CreditsProps) {
  return (
    <ProfileCard title="Credits">
      <Balance credits={props.credits} isPremium={props.isPremium} />
    </ProfileCard>
  );
}
