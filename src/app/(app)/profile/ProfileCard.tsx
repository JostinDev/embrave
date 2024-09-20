import React from 'react';

export default async function ProfileCard(props: { children: React.ReactNode; title: string }) {
  return (
    <div className="rounded-[26px] border border-solid border-sand-5 bg-sand-1 p-6 sm:p-8">
      {props.title && (
        <p className="mb-6 font-nexa text-[20px] font-bold leading-8 text-sand-12 sm:text-[26px]">
          {props.title}
        </p>
      )}
      {props.children}
    </div>
  );
}
