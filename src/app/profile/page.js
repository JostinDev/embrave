'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import user from '@/app/images/user.png';

export default function Page() {
  const [email, setEmail] = useState('Log in to see your profile...');
  const [name, setName] = useState('John');
  const [avatar, setAvatar] = useState(user);
  const [points, setPoints] = useState(0);
  const [credits, setCredits] = useState(0);

  const [countChallenge, setCountChallenge] = useState(0);
  const [countMilestone, setCountMilestone] = useState(0);
  const [countUser, setCountUser] = useState(0);
  const [countRoom, setCountRoom] = useState(0);

  useEffect(() => {
    fetchDetails();
    fetchChallenge();
    getStats();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await fetch('/api/user');

      const user = await response.json();
      setEmail(user.email);
      setName(user.name);
      setAvatar(user.avatar);
      setPoints(user.points);
      setCredits(user.credits);
    } catch (error) {
      console.error('User not logged in');
    }
  };

  const fetchChallenge = async () => {
    try {
      const response = await fetch('/api/challenge');

      const challenge = await response.json();
      console.log('Challenge : ', challenge);
    } catch (error) {
      console.error(error);
    }
  };

  async function saveUser() {
    const data = { username: name };

    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    await response.json().then((response) => {
      console.log(response);
    });
  }

  async function getStats() {
    (await fetch('/api/challenge/count')).json().then((response) => {
      setCountChallenge(response);
    });

    (await fetch('/api/room/count')).json().then((response) => {
      setCountRoom(response);
    });

    (await fetch('/api/user/count')).json().then((response) => {
      setCountUser(response);
    });

    (await fetch('/api/milestone/count')).json().then((response) => {
      setCountMilestone(response);
    });
  }

  return (
    <div>
      <div className="my-4">
        <p className="mb-4 text-2xl">Some stats : </p>
        <p className="text-xl">Challenge count : {countChallenge}</p>
        <p className="text-xl">Room count : {countRoom}</p>
        <p className="text-xl">User count : {countUser}</p>
        <p className="text-xl">Milestone count : {countMilestone}</p>
        <p className="text-xl">Credits left : {credits}</p>
      </div>

      <div className="flex items-center gap-4">
        <Image className="rounded-full" width={100} height={100} alt={''} src={avatar} />
        <div>
          <p className="text-xl">{name}</p>
          <input
            onChange={(event) => setName(event.target.value)}
            className={'border-2 border-blue-500 '}
            value={name}
          />
          <p className="text-lg">{email}</p>
          <p className="text-lg">{points}</p>
        </div>
      </div>
      <p onClick={() => saveUser()} className={'cursor-pointer'}>
        Save new username
      </p>
    </div>
  );
}
