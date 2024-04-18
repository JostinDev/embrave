'use client';

import './page.css';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import md5 from 'md5';

import Label from '@/components/label';

type Challenge = {
  title: string;
  description: string;
};

type User = {
  id: number;
  name: string;
  avatar: string;
};

type Milestone = {
  id: number;
  title: string;
  user: User;
  description: string;
  ticked: boolean;
  timestamp: string;
  milestoneMedia: { link: string }[];
};

type Room = {
  created: string; // You might want to use Date instead of string
  link: string;
};

type UserRoom = {
  user: User;
  admin: boolean;
};

export default function Challenge() {
  const [room, setRoom] = useState<Room>({ created: '', link: '' });
  const [challenge, setChallenge] = useState<Challenge>({ title: '', description: '' });
  const [milestoneList, setMilestoneList] = useState<Milestone[]>([]);

  const [milestonePicture, setMilestonePicture] = useState<File[]>([]);
  const [milestoneDescription, setMilestoneDescription] = useState('');
  const [milestoneTitle, setMilestoneTitle] = useState('');

  const [uploadedPicture, setUploadedPicture] = useState<string[]>([]);

  const [weekday, setWeekday] = useState<string[]>([]);

  const [milestoneDoneAt, setMilestoneDoneAt] = useState([]);
  const [user, setUser] = useState<User>({ id: -1, name: '', avatar: '' });

  const [users, setUsers] = useState([]);

  const router = useRouter();
  const { roomID } = router.query;

  let id = roomID ? roomID.toString() : '';

  let pictureLink: string[] = [];

  useEffect(() => {
    datePicker();
    fetchMilestone();
    fetchMilestoneTime();
    getUser();
    getUsers();
    getRoom();
  }, []);

  const datePicker = () => {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const now = new Date();
    const day = now.getDay();
    console.log(day);

    let today = weekday[day];
    console.log(today);

    const reorderArr = (i: number, arr: string[]) => {
      return [...arr.slice(i), ...arr.slice(0, i)];
    };

    const reorderedArr = reorderArr(0, weekday);
    console.log(reorderedArr);

    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);

    let weekDate: string[] = [];
    for (let i = 0; i < 7; i++) {
      const dateString = new Date(
        yourDate.getTime() - offset * 60 * 1000 - 1000 * 60 * 60 * 24 * i,
      ).toISOString();
      weekDate[i] = dateString ? dateString.split('T')[0] || '' : '';
    }

    setWeekday(weekDate);
  };

  function getDayName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, { weekday: 'long' });
  }

  const fetchMilestone = async () => {
    const response = await fetch(`/api/milestone/${id}`);

    await response.json().then((response) => {
      console.log(response);
      setMilestoneList(response);
      console.log('GET ALL MILESTONES : ', response);
    });
  };

  const getRoom = async () => {
    const response = await fetch(`/api/room/${id}`);
    await response.json().then((response) => {
      setRoom(response);
      setChallenge(response.challenge);
      console.log('ROOM : ', response);
      console.log('ROOM CHALLENGE : ', response.challenge);
    });
  };

  const getUser = async () => {
    const response = await fetch('/api/user');
    await response
      .json()
      .then((response) => {
        console.log('CONNECTED USER : ', response);
        setUser(response);
        return response;
      })
      .catch((e) => {
        return e;
      });
  };

  const getUsers = async () => {
    const response = await fetch(`/api/user/room/${id}`);

    await response
      .json()
      .then((response) => {
        console.log('List of users : ', response);
        setUsers(response);
      })
      .catch((e) => {
        return e;
      });
  };

  const fetchMilestoneTime = async () => {
    try {
      const response = await fetch(`/api/milestone/time/${id}`);
      await response.json().then((response) => {
        console.log('THE RESPONSE :', response);

        let yourDate = new Date();
        const offset = yourDate.getTimezoneOffset();
        yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
        console.log(yourDate.getTime());

        response.forEach((i: number) => {
          let test = new Date(response[i]);
          let newDate = new Date(test.getTime() - offset * 60 * 1000);
          console.log(newDate);
          response[i] = newDate.toISOString().split('T')[0];
        });

        setMilestoneDoneAt(response);
        console.log('THE RESPONSE :', response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function upload() {
    let promiseArray: Promise<string>[] = [];
    // Get selected files from the input element.
    Array.from(milestonePicture).map(async (file) => {
      const timestamp = Date.now().toString();
      const hashedFileName = md5(timestamp + file.name);
      const filename = file.name;
      const extension =
        filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;

      let fileWithUpdatedName = new File([file], hashedFileName + '.' + extension);

      promiseArray.push(
        new Promise(async (resolve, reject) => {
          fetch(`/api/milestone/presigned/${fileWithUpdatedName.name}`)
            .then((response) => {
              response.text().then(async (url) => {
                fetch(url, {
                  method: 'PUT',
                  body: fileWithUpdatedName,
                })
                  .then(() => {
                    setUploadedPicture((uploadedPicture) => [
                      ...uploadedPicture,
                      fileWithUpdatedName.name,
                    ]);
                    pictureLink = [...pictureLink, fileWithUpdatedName.name];
                    console.log(fileWithUpdatedName.name);
                    resolve(fileWithUpdatedName.name);
                  })
                  .catch((e) => {
                    console.error(e);
                    reject(e);
                  });
              });
            })
            .catch((e) => {
              console.error(e);
            });
        }),
      );
    });
    await Promise.all(promiseArray);
    await saveMilestone();
  }

  async function saveMilestone() {
    console.log(pictureLink);
    console.log('FOR MILESTONE : ', id);

    const formData = new FormData();

    formData.append('description', milestoneDescription);
    formData.append('title', milestoneTitle);
    formData.append('roomID', id);
    formData.append('files', pictureLink.join(','));

    const response = await fetch('/api/milestone', {
      method: 'POST',
      body: formData,
    });

    await response.json().then((response) => {
      console.log(response);
    });
  }

  async function saveTickedMilestone(isTicked: boolean, day: string) {
    const data = { milestone_ticked: isTicked, milestone_doneAt: day };

    await fetch(`/api/milestone/ticked/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  async function manageSelectedPictures(files: FileList | null) {
    console.log(files);
    if (files) {
      if (files.length > 4) {
        console.log('Cannot upload more than 4 images per milestones');
        setMilestonePicture(Array.from(files).slice(0, 4));
      } else {
        setMilestonePicture(Array.from(files).slice(0, 0));
      }
    }
  }

  async function deleteMilestone(milestoneID: number) {
    await fetch(`/api/milestone/${milestoneID}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function leaveRoom() {
    await fetch(`/api/room/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function promoteToAdmin(userID: number) {
    const response = await fetch(`/api/room/${id}/admin/${userID}`, {
      method: 'PUT',
    });

    await response
      .json()
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  }

  async function kickFromRoom(userID: number) {
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

  async function updateRoomLink() {
    const response = await fetch(`/api/room/${id}/updateLink`, {
      method: 'PUT',
    });

    await response
      .json()
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  }

  function timestampToDate(timestamp: string) {
    let date = new Date(timestamp);
    return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
  }

  return (
    // TODO Mark a challenge as done
    // TODO show image to be uploaded
    // TODO prevent more than 4 images
    <div className="relative min-h-screen">
      <h1 className="text-large-title mb-8 text-sand-12">{challenge.title}</h1>

      <div className={'absolute right-0 top-0 flex items-center gap-6'}>
        <button className={'text-body-l-book h-fit rounded-lg bg-sand-12 p-3 text-sand-3'}>
          Share
        </button>
        <div className={'flex'}>
          {users.map((userRoom: UserRoom, i: number) => {
            return (
              <img
                key={i}
                style={{ marginLeft: -24 * i }}
                title={userRoom.user.name}
                alt={userRoom.user.name}
                className={'h-12 w-12 rounded-full border-2 border-sand-12'}
                src={userRoom.user.avatar}
              />
            );
          })}
        </div>
      </div>

      <div className={'mb-14 flex gap-8'}>
        <div className={'flex flex-col gap-2'}>
          <p className={'text-body-m-bold'}>Date started:</p>
          <p>{room.created}</p>
        </div>
        <div className={'flex flex-col gap-2'}>
          <p className={'text-body-m-bold'}>Type:</p>
          <Label type={'dailyChallenge'}></Label>
        </div>
      </div>

      <h2 className={'text-title1 mb-4'}>Challenge description</h2>
      <p className={'text-body-l-book mb-14'}>{challenge.description}</p>

      <div className={'max-w-[700px]'}>
        <h2 className={'text-title1 mb-6'}>Your activity</h2>
        <div className={'relative'} id={'milestoneList'}>
          {milestoneList.map((milestone, i, row) => {
            return (
              <div
                key={i}
                className={
                  'milestoneItem flex flex-col ' +
                  (i + 1 === row.length ? 'lastMilestone mb-10 ' : 'pb-10 ') +
                  (i === 0 ? 'firstMilestone ' : '')
                }
              >
                <div className={'metadata flex justify-between pl-16'}>
                  <Label type={milestone.ticked ? 'milestone' : 'update'}></Label>
                  <p className={'text-body-s-book text-sand-11'}>
                    {timestampToDate(milestone.timestamp)}
                  </p>
                </div>

                <div className={'metabody'}>
                  <div className={'flex items-center gap-4'}>
                    <img
                      title={milestone.user.name}
                      alt={milestone.user.name}
                      className={'profilePicture h-12 w-12 rounded-full border-2 border-sand-12'}
                      src={milestone.user.avatar}
                    />
                    <p className={'text-title2'}>
                      {milestone.title
                        ? milestone.title
                        : milestone.user.name + ' has set the challenge as done'}
                    </p>
                  </div>
                  <p className={'text-body-l-book pb-6 pl-16'}>{milestone.description}</p>

                  <div className={'flex flex-row gap-2 pl-16'}>
                    {milestone.milestoneMedia.map((media, i) => {
                      return (
                        <img
                          key={i}
                          className="flex h-24 w-36 rounded-2xl object-cover drop-shadow"
                          src={''}
                        ></img>
                      );
                    })}
                  </div>

                  <div className={'ml-16'}>
                    {user.id === milestone.user.id ? (
                      <p
                        onClick={() => deleteMilestone(milestone.id)}
                        className={'cursor-pointer font-bold text-red-700'}
                      >
                        Delete the milestone
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <h1 onClick={() => updateRoomLink()} className="mb-10 cursor-pointer text-2xl">
        Generate new link
      </h1>
      <a
        className={'mb-4 block'}
        href={process.env.NEXT_PUBLIC_GATEWAY_URL + '/api/room/join/' + room.link}
      >
        Room link : http://localhost:8080/api/room/join/{room.link}
      </a>

      <div>
        <h1 className="mb-10 text-2xl">Users in room : </h1>

        {users.map((userRoom: UserRoom, i) => {
          return (
            <div key={i} className={'mb-6'}>
              <img src={userRoom.user.avatar} />
              <p>{userRoom.user.name}</p>
              <p className={'text-green-600'}>{userRoom.admin ? 'Admin' : 'Not admin'}</p>
              <p
                onClick={() => promoteToAdmin(userRoom.user.id)}
                className={'cursor-pointer text-green-600'}
              >
                {userRoom.user.id !== user.id && !userRoom.admin ? 'Promote to admin' : ''}
              </p>
              <p
                onClick={() => kickFromRoom(userRoom.user.id)}
                className={'cursor-pointer text-green-600'}
              >
                {userRoom.user.id !== user.id && !userRoom.admin ? 'Kick from the room' : ''}
              </p>
              <p
                onClick={() => kickFromRoom(userRoom.user.id)}
                className={'cursor-pointer text-green-600'}
              >
                Kick from the room
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-row-reverse gap-2">
        {weekday.map((day: string, i: number) => {
          return (
            <p
              key={i}
              onClick={() => saveTickedMilestone((milestoneDoneAt as string[]).includes(day), day)}
              className={`cursor-pointer rounded-full  p-2 text-white ${(milestoneDoneAt as string[]).includes(day) ? 'bg-amber-400' : 'bg-blue-500'} `}
            >
              {getDayName(new Date(day))}
            </p>
          );
        })}
      </div>

      <h1 className={'mt-10 text-2xl'}>Milestone</h1>
      {/* TODO only allow 4 pictures to be uploaded */}
      <input
        id="image-file"
        type="file"
        accept=".png, .jpg, .jpeg"
        multiple
        onChange={(e) => manageSelectedPictures(e.target.files)}
      />
      <img className={'w-40'} id={'pic'} src={''}></img>

      <div className={'flex w-fit flex-col'}>
        <label htmlFor={'milestoneTitle'}>Title</label>
        <input
          className={'border border-b-gray-400'}
          id={'milestoneTitle'}
          type={'text'}
          onChange={(e) => setMilestoneTitle(e.target.value)}
        />

        <label htmlFor={'milestoneDescription'}>Description</label>
        <input
          className={'border border-b-gray-400'}
          id={'milestoneDescription'}
          type={'text'}
          onChange={(e) => setMilestoneDescription(e.target.value)}
        />
      </div>

      <h1 className={'text-xl'} onClick={() => upload()}>
        SEND
      </h1>

      {uploadedPicture.map((picture) => {
        return <p key={picture}>{picture}</p>;
      })}
      <h1
        onClick={() => leaveRoom()}
        className="mb-10 cursor-pointer text-2xl font-bold text-red-700"
      >
        Quit the room
      </h1>
    </div>
  );
}