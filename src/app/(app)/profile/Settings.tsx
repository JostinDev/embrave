import ProfileCard from '@/app/(app)/profile/ProfileCard';
import SettingsModal from '@/app/(app)/profile/SettingsModal';

type SettingsProps = {
  userId: string;
};

export default function Settings(settingsProps: SettingsProps) {
  return (
    <ProfileCard title="Settings">
      <div className="bg-tomato-2 rounded-2xl border border-dashed border-red-11 p-4">
        <p className="mb-3 text-center text-red-11">Delete your account and data</p>
        <SettingsModal userId={settingsProps.userId} />
      </div>
    </ProfileCard>
  );
}
