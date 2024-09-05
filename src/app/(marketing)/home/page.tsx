import Header from '@/app/(marketing)/home/Header';
import LandingCard from '@/app/(marketing)/home/LandingCard';
import Separator from '@/app/(marketing)/home/Separator';

export default function LandingPage() {
  return (
    <div>
      <div className="container mx-auto px-4 pb-20 pt-60">
        <Header />

        <p className="mx-auto mb-12 max-w-[1000px] text-center font-nexa text-7xl font-extrabold text-sand-12">
          Staying in your <span className="font-sourceSerif4 font-light italic">comfort zone?</span>
          Not today.
        </p>

        <LandingCard
          title="Built for change"
          content="We value self development. That is why we created Embrave, so that you can start challenges to push yourself outside your comfort zone."
        />

        <Separator />

        <p className="mx-auto mb-12 max-w-[1000px] text-center font-nexa text-7xl font-extrabold text-sand-12">
          <p>
            In it with your <span className="font-sourceSerif4 font-light italic">friends.</span>
          </p>
          <p>
            Or just <span className="font-sourceSerif4 font-light italic">on your own.</span>
          </p>
        </p>

        <LandingCard
          title="Sharing experiences"
          content="Sometimes is nice to have friends to hold you accountable. Other times you just want to be on your own. With Embrave you can do both."
        />

        <Separator />

        <p className="mx-auto mb-12 max-w-[1000px] text-center font-nexa text-7xl font-extrabold text-sand-12">
          You are on <span className="font-sourceSerif4 font-light italic">fire!</span>
        </p>

        <LandingCard
          title="Habit building"
          content="With Embrave you can track your progress easily, so that you really follow through with your challenge."
        />
      </div>
    </div>
  );
}
