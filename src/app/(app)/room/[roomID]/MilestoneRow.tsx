import React from 'react';
import Image from 'next/image';
import { twJoin } from 'tailwind-merge';

import Badge from '@/app/(app)/components/Badge';
import type { MilestoneMedia } from '@/server/db/schema';
import DeleteMilestoneModal from './DeleteMilestoneModal';
import MilestoneRowLightbox from './MilestoneRowLightbox';

type MilestoneRowProps = {
  milestone: {
    user: {
      fullName: string | null;
      username: string | null;
      imageUrl: string;
    };
    id: number;
    title: string | null;
    description: string | null;
    roomID: number | null;
    userID: string;
    timestamp: Date;
    ticked: boolean | null;
    medias: MilestoneMedia[];
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
      className={twJoin(
        "relative flex flex-col before:absolute before:bottom-0 before:left-5 before:h-full before:border-l-2 before:border-dashed before:border-sand-5 before:[border-image:url('/images/customBorder.svg')_30_round] sm:before:left-6",
        !props.isLastRow && 'pb-10',
      )}
    >
      <div className="flex justify-between pl-14 sm:pl-16">
        {props.isLastMilestone ? (
          <Badge key="challengeCompleted" style="big" type="challengeCompleted" />
        ) : (
          <Badge
            key={props.milestone.ticked ? 'milestone' : 'update'}
            style="big"
            type={props.milestone.ticked ? 'milestone' : 'update'}
          />
        )}
        <div className="flex items-center justify-between gap-2">
          {props.currentUserID === props.milestone.userID &&
            props.milestone.roomID !== null &&
            !props.isChallengeDone && (
              <DeleteMilestoneModal
                roomID={props.milestone.roomID}
                milestoneID={props.milestone.id}
              />
            )}
          <p className="font-inter text-xs leading-14 text-sand-11">
            {props.milestone.timestamp.toLocaleDateString()}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4">
          <Image
            title={props.milestone.user.username ?? undefined}
            alt={
              props.milestone.user.username
                ? `Profile picture of ${props.milestone.user.username}`
                : 'Profile picture'
            }
            width={48}
            height={48}
            className="profilePicture z-0 h-10 w-10 rounded-full border-2 border-sand-12 sm:h-12 sm:w-12"
            src={props.milestone.user.imageUrl}
          />
          {props.isLastMilestone ? (
            <p className="font-nexa text-lg font-bold text-sand-12 sm:text-xl">
              The challenge is complete!
            </p>
          ) : (
            <p className="font-nexa text-lg font-bold text-sand-12 sm:text-xl">
              {props.milestone.ticked
                ? props.milestone.user.username + ' has set the challenge as done'
                : props.milestone.title}
            </p>
          )}
        </div>

        {props.isLastMilestone ? (
          <p className="pb-6 pl-14 font-inter text-base leading-18 text-sand-11 sm:pl-16">
            Congratulations on finishing the challenge!
          </p>
        ) : (
          <p className="pb-6 pl-14 font-inter text-base leading-18 text-sand-11 sm:pl-16">
            {props.milestone.description}
          </p>
        )}
      </div>
      <MilestoneRowLightbox medias={props.milestone.medias} />
    </div>
  );
}
