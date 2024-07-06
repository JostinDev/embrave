type RemainingCreditsProps = {
  credits: number;
  cost: number;
};

export default function RemainingCredits(props: RemainingCreditsProps) {
  return (
    <div className="flex w-full flex-wrap gap-4 rounded-2xl border border-dashed border-sand-11 bg-white p-4 sm:flex-nowrap sm:gap-6">
      <div className="flex w-full flex-col rounded-lg border border-solid border-sand-7 bg-sand-2 p-3">
        <p className="pb-1 text-center font-inter text-base font-black leading-5 text-sand-12">
          Current Balance:
        </p>
        <p className="text-center font-inter text-base font-medium leading-5 text-sand-9">
          {props.credits} credits
        </p>
      </div>

      <div className="flex w-full flex-col p-3">
        <p className="pb-1 text-center font-inter text-base font-black leading-5 text-sand-12">
          Starting the challenge:
        </p>
        <p className="text-center font-inter text-base font-medium leading-5 text-sand-10">
          - {props.cost} credit
        </p>
      </div>
    </div>
  );
}
