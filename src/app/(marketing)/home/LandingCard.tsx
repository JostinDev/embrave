export default function LandingCard(LandingCardProps: { title: string; content: string }) {
  return (
    <div className="mx-auto max-w-[950px] rounded-[26px] border border-sand-5 bg-sand-1 p-8">
      <p className="font-nexa text-lg font-bold text-sand-11 md:text-xl">
        {LandingCardProps.title}
      </p>
      <p className="font-nexa text-2xl font-bold text-sand-12 md:text-[32px]">
        {LandingCardProps.content}
      </p>
      <p></p>
    </div>
  );
}
