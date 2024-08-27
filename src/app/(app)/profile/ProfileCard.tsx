import React from 'react';

export default async function ProfileCard(props: { children: React.ReactNode; title: string }) {
  return (
    <div className="rounded-[26px] border border-solid border-sand-5 bg-sand-1 p-8">
      {props.title && (
        <p className="mb-6 font-nexa text-[26px] font-bold leading-8 text-sand-12">{props.title}</p>
      )}
      {props.children}
    </div>
  );
}
