import React from 'react';

import Badge from '@/components/Badge';
import { deleteMilestone } from '@/server/mutations';

type MilestoneRowProps = {
  milestone: {
    user: {
      fullName: string | null;
      imageUrl: string;
    };
    id: number;
    title: string | null;
    description: string | null;
    roomID: number | null;
    userID: string;
    timestamp: Date;
    ticked: boolean | null;
    medias: { id: number; link: string; milestoneID: number | null }[];
  };
  isLastRow: boolean;
  isFirstRow: boolean;
  isChallengeDone: boolean;
  isLastMilestone: boolean;
  currentUserID: string;
};

export default function MilestoneRow(props: MilestoneRowProps) {
  return (
    <div
      className={`relative flex flex-col before:absolute before:bottom-0 before:left-6 before:h-full before:border-l-2 before:border-dashed before:border-sand-5 before:[border-image:url('/images/customBorder.svg')_30_round] ${props.isLastRow ? 'mb-10 ' : 'pb-10'}`}
    >
      <div className="flex justify-between pl-16">
        {props.isLastMilestone ? (
          <Badge key={'challengeCompleted'} style={'big'} type={'challengeCompleted'}></Badge>
        ) : (
          <Badge
            key={props.milestone.ticked ? 'milestone' : 'update'}
            style={'big'}
            type={props.milestone.ticked ? 'milestone' : 'update'}
          ></Badge>
        )}

        <p className="text-body-s-book text-sand-11">
          {props.milestone.timestamp.toLocaleDateString()}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-4">
          <img
            title={props.milestone.user.fullName ?? undefined}
            alt={props.milestone.user.fullName ?? undefined}
            className="profilePicture z-0 h-12 w-12 rounded-full border-2 border-sand-12"
            src={props.milestone.user.imageUrl}
          />
          {props.isLastMilestone ? (
            <p className="text-title2">The challenge is complete!</p>
          ) : (
            <p className="text-title2">
              {props.milestone.ticked
                ? props.milestone.user.fullName + ' has set the challenge as done'
                : props.milestone.title}
            </p>
          )}
        </div>

        {props.isLastMilestone ? (
          <p className="text-body-l-book pb-6 pl-16">Congratulations on finishing the challenge!</p>
        ) : (
          <p className="text-body-l-book pb-6 pl-16">{props.milestone.description}</p>
        )}

        <div className="flex flex-row gap-2 pl-16">
          {props.milestone.medias.map((media) => {
            return (
              <img
                key={media.id}
                className="flex h-24 w-36 rounded-2xl object-cover drop-shadow"
                src={media.link}
              />
            );
          })}
        </div>
        {props.currentUserID === props.milestone.userID && (
          <form
            action={deleteMilestone.bind(null, props.milestone.id, props.milestone.roomID)}
            className="ml-16"
          >
            <button className="font-bold text-red-700">Delete the Milestone</button>
          </form>
        )}
      </div>
    </div>
  );
}
