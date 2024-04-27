import './page.css';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import fire from '@/app/images/fire.svg';
import plus from '@/app/images/orange-10-plus.svg';
import stairs from '@/app/images/stairs_cover.jpg';
import AddMilestoneForm from '@/app/room/[roomID]/AddMilestoneForm';
import Badge from '@/components/badge';
import SharePopover from '@/components/sharePopover';
import { deleteMilestone, generateNewRoomLink } from '@/server/mutations';
import { getRoom, isRoomAdmin, isUserInRoom } from '@/server/queries';

function getWeekdays() {
  let yourDate = new Date();
  const offset = yourDate.getTimezoneOffset();
  yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);

  let weekdays: string[] = [];
  for (let i = 0; i < 7; i++) {
    const dateString = new Date(
      yourDate.getTime() - offset * 60 * 1000 - 1000 * 60 * 60 * 24 * i,
    ).toISOString();
    weekdays[i] = dateString ? dateString.split('T')[0] || '' : '';
  }

  return weekdays;
}

export default async function RoomPage({ params }: { params: { roomID: string } }) {
  const { userId: currentUserID } = auth().protect();

  const roomID = Number(params.roomID);

  if (!(await isUserInRoom(currentUserID, roomID)))
    return (
      <div>
        <p className={'text-title1 text-sand-12'}>This room doesn&apos;t exist</p>
      </div>
    );

  const isAdmin = await isRoomAdmin(currentUserID, roomID);
  const room = await getRoom(roomID);

  if (!room || !room.challenge) {
    notFound();
  }

  function formatMilestoneDate(milestoneDate: Date) {
    const offsetAdjustedDate = new Date(
      milestoneDate.getTime() - new Date().getTimezoneOffset() * 60000,
    );
    return offsetAdjustedDate.toISOString().split('T')[0]!;
  }

  const milestoneDoneAt = room.milestones.map((milestone) =>
    formatMilestoneDate(milestone.timestamp),
  );
  const userRooms = room.userRooms;

  // const [milestonePicture, setMilestonePicture] = useState<File[]>([]);
  // const [uploadedPicture, setUploadedPicture] = useState<string[]>([]);

  let pictureLink: string[] = [];

  const weekdays = getWeekdays();

  // async function upload() {
  //   let promiseArray: Promise<string>[] = [];
  //   // Get selected files from the input element.
  //   Array.from(milestonePicture).map(async (file) => {
  //     const timestamp = Date.now().toString();
  //     const hashedFileName = md5(timestamp + file.name);
  //     const filename = file.name;
  //     const extension =
  //       filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
  //
  //     let fileWithUpdatedName = new File([file], hashedFileName + '.' + extension);
  //
  //     promiseArray.push(
  //       new Promise(async (resolve, reject) => {
  //         fetch(`/api/milestone/presigned/${fileWithUpdatedName.name}`)
  //           .then((response) => {
  //             response.text().then(async (url) => {
  //               fetch(url, {
  //                 method: 'PUT',
  //                 body: fileWithUpdatedName,
  //               })
  //                 .then(() => {
  //                   setUploadedPicture((uploadedPicture) => [
  //                     ...uploadedPicture,
  //                     fileWithUpdatedName.name,
  //                   ]);
  //                   pictureLink = [...pictureLink, fileWithUpdatedName.name];
  //                   console.log(fileWithUpdatedName.name);
  //                   resolve(fileWithUpdatedName.name);
  //                 })
  //                 .catch((e) => {
  //                   console.error(e);
  //                   reject(e);
  //                 });
  //             });
  //           })
  //           .catch((e) => {
  //             console.error(e);
  //           });
  //       }),
  //     );
  //   });
  //   await Promise.all(promiseArray);
  //   await saveMilestone();
  // }

  // async function saveMilestone() {
  //   console.log(pictureLink);
  //   console.log('FOR MILESTONE : ', params.roomID);
  //
  //   const formData = new FormData();
  //
  //   formData.append('description', milestoneDescription);
  //   formData.append('title', milestoneTitle);
  //   formData.append('roomID', params.roomID);
  //   formData.append('files', pictureLink.join(','));
  //
  //   const response = await fetch('/api/milestone', {
  //     method: 'POST',
  //     body: formData,
  //   });
  //
  //   await response.json().then((response) => {
  //     console.log(response);
  //   });
  // }

  async function saveTickedMilestone(isTicked: boolean, day: string) {
    const data = { milestone_ticked: isTicked, milestone_doneAt: day };

    await fetch(`/api/milestone/ticked/${params.roomID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  // async function manageSelectedPictures(files: FileList | null) {
  //   console.log(files);
  //   if (files) {
  //     if (files.length > 4) {
  //       console.log('Cannot upload more than 4 images per milestones');
  //       setMilestonePicture(Array.from(files).slice(0, 4));
  //     } else {
  //       setMilestonePicture(Array.from(files).slice(0, 0));
  //     }
  //   }
  // }

  async function leaveRoom() {
    await fetch(`/api/room/${params.roomID}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function promoteToAdmin(userID: string) {
    const response = await fetch(`/api/room/${params.roomID}/admin/${userID}`, {
      method: 'PUT',
    });

    await response
      .json()
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  }

  async function kickFromRoom(userID: string) {
    const response = await fetch(`/api/room/1002/kick/${userID}`, {
      method: 'DELETE',
    });
    await response
      .json()
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  }

  return (
    // TODO Mark a challenge as done
    // TODO show image to be uploaded
    // TODO prevent more than 4 images
    <div className="relative min-h-screen">
      <div className={'mb-6 flex justify-between'}>
        <Link href={'/'} className="text-body-l-medium flex items-center text-sand-12">
          &lt; Back
        </Link>
        <div className="flex items-center gap-6">
          {isAdmin && (
            <SharePopover isLinkActive={room.isLinkActive} link={room.link} roomID={room.id} />
          )}
          <div className="flex">
            {userRooms.map((userRoom, i) => {
              return (
                <img
                  key={userRoom.id}
                  title={userRoom.user.fullName ?? undefined}
                  alt={userRoom.user.fullName ?? undefined}
                  className={'h-12 w-12 rounded-full border-2 border-sand-12 '}
                  style={i !== 0 ? { marginLeft: -24 } : { marginLeft: 0 }}
                  src={userRoom.user.imageUrl}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className={'relative mb-8'}>
        <Image
          className={'h-[400px] w-full rounded-[26px]'}
          style={{ objectFit: 'cover' }}
          placeholder={'blur'}
          src={stairs}
          alt={''}
        ></Image>
        <div
          className={
            'absolute bottom-4 left-4 right-4 rounded-2xl border border-sand-5 bg-white bg-opacity-90 p-8 backdrop-blur'
          }
        >
          <p slot="title" className={'text-large-title mb-4 text-sand-12'}>
            {room.challenge.title}
          </p>
          <div className={'flex flex-wrap gap-6'}>
            <div>
              <p className="text-body-m-bold mb-2 text-sand-12">Date started:</p>
              <p className={'text-body-l-book text-sand-12'}></p>
              <Badge style={'big'} text={room.created.toLocaleDateString()} type={'date'}></Badge>
            </div>
            <div>
              <p className={'text-body-m-bold mb-2 text-sand-12'}>Type:</p>
              <Badge style={'big'} type={'dailyChallenge'}></Badge>
            </div>
            <div>
              <p className={'text-body-m-bold mb-2 text-sand-12'}>Current streak:</p>
              <Badge style={'big'} streak={42} type={'streak'}></Badge>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          'w-100 mx-auto mb-6 max-w-[700px] rounded-[26px] border border-sand-5 bg-sand-1 p-8'
        }
      >
        <p className={'text-title1 mb-2 text-sand-12'}>Challenge description</p>
        <p className={'text-body-l-book text-sand-12'}>{room.challenge.description}</p>
      </div>

      <div
        className={
          'w-100 mx-auto mb-6 max-w-[700px] rounded-[26px] border border-orange-4 bg-orange-2 p-8'
        }
      >
        <p className={'text-title1 mb-2 text-orange-10'}>Streak Tracker</p>
        <p className={'text-body-l-book mb-6 text-orange-10'}>
          Check each day that you reached your goal to uphold your streak! You can fill out the last
          7 days.
        </p>
        <div className={'flex flex-row-reverse justify-between'}>
          {weekdays.map((day: string, i: number) => {
            const isMilestoneDone = (milestoneDoneAt as string[]).includes(day);
            return (
              <div
                key={i}
                // onClick={() => saveTickedMilestone((milestoneDoneAt as string[]).includes(day), day)}
                className={'flex cursor-pointer flex-col items-center gap-2 text-orange-10'}
              >
                <div
                  className={`text-title2 flex h-12 w-12 justify-center rounded-full border border-orange-10 transition-all hover:bg-orange-4
                   ${isMilestoneDone ? 'border-solid bg-orange-9' : 'border-dashed'}
                   `}
                >
                  {isMilestoneDone ? (
                    <Image alt={''} src={fire}></Image>
                  ) : (
                    <Image alt={''} src={plus}></Image>
                  )}
                </div>
                <p
                  className={`${isMilestoneDone || i === 0 ? 'text-body-m-bold' : 'text-body-m-book'}`}
                >
                  {i === 0
                    ? 'Today'
                    : new Date(day).toLocaleDateString(undefined, { weekday: 'short' })}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={
          'w-100 mx-auto mb-4 max-w-[700px] rounded-[26px] border border-sand-5 bg-sand-1 p-8'
        }
      >
        <p className={'text-title1 mb-2 text-sand-12'}>Your activity</p>
        <div className="relative">
          <div className={'milestoneItem flex gap-4 pb-10'}>
            <div
              className={
                'z-0 h-[48px] w-[48px] flex-shrink-0 rounded-full border border-sand-5 bg-sand-3'
              }
            ></div>
            <AddMilestoneForm key={room.milestones.length} roomID={roomID} />
          </div>

          <div>
            {room.milestones.map((milestone, i, row) => {
              return (
                <div
                  key={i}
                  className={
                    'milestoneItem flex flex-col ' +
                    (i + 1 === row.length ? 'lastMilestone mb-10 ' : 'pb-10 ') +
                    (i === 0 ? 'firstMilestone ' : '')
                  }
                >
                  <div className="metadata flex justify-between pl-16">
                    <Badge style={'big'} type={milestone.ticked ? 'milestone' : 'update'}></Badge>
                    <p className="text-body-s-book text-sand-11">
                      {milestone.timestamp.toLocaleDateString()}
                    </p>
                  </div>

                  <div className="metabody">
                    <div className="flex items-center gap-4">
                      <img
                        title={milestone.user.fullName ?? undefined}
                        alt={milestone.user.fullName ?? undefined}
                        className="profilePicture z-0 h-12 w-12 rounded-full border-2 border-sand-12"
                        src={milestone.user.imageUrl}
                      />
                      <p className="text-title2">
                        {milestone.title
                          ? milestone.title
                          : milestone.user.fullName + ' has set the challenge as done'}
                      </p>
                    </div>
                    <p className="text-body-l-book pb-6 pl-16">{milestone.description}</p>

                    <div className="flex flex-row gap-2 pl-16">
                      {milestone.medias.map((media) => {
                        return (
                          <img
                            key={media.id}
                            className="flex h-24 w-36 rounded-2xl object-cover drop-shadow"
                            src={media.link}
                          />
                        );
                      })}
                    </div>
                    {currentUserID === milestone.userID && (
                      <form action={deleteMilestone.bind(null, milestone.id)} className="ml-16">
                        <button className="font-bold text-red-700">Delete the Milestone</button>
                      </form>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <h1 className="mb-10 text-2xl">Users in room : </h1>

        {userRooms.map((userRoom, i) => {
          return (
            <div key={userRoom.id} className="mb-6">
              <img src={userRoom.user.imageUrl} className="size-12" />
              <p>{userRoom.user.fullName}</p>
              <p className="text-green-600">{userRoom.isAdmin ? 'Admin' : 'Not admin'}</p>
              <p
                // onClick={() => promoteToAdmin(userRoom.user.id)}
                className="cursor-pointer text-green-600"
              >
                {userRoom.user.id !== currentUserID && !userRoom.isAdmin && 'Promote to admin'}
              </p>
              <p
                // onClick={() => kickFromRoom(userRoom.user.id)}
                className="cursor-pointer text-green-600"
              >
                {userRoom.userID !== currentUserID && !userRoom.isAdmin && 'Kick from the room'}
              </p>
              <p
                // onClick={() => kickFromRoom(userRoom.userID)}
                className="cursor-pointer text-green-600"
              >
                Kick from the room
              </p>
            </div>
          );
        })}
      </div>

      <h1
        // onClick={() => leaveRoom()}
        className="mb-10 cursor-pointer text-2xl font-bold text-red-700"
      >
        Quit the room
      </h1>
    </div>
  );
}
