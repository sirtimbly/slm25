// import { Link } from 'waku';
// import io from 'socket.io-client'
// import { feathers } from '@feathersjs/feathers'
// import socketio from '@feathersjs/socketio-client'



import { Counter } from '../components/counter.js';
import {useMissions} from "../hooks/useMissions.js";

export default async function HomePage() {
  const {
			missions,
		}= useMissions();
  const missionsList = await missions.find()

  return (
    <div>
      <h1>new app</h1>
      <title>Total {missionsList.total}</title>

      {missionsList.data.map((x) => (<p key={x.id}>{x.name}</p>))}
      <Counter />

    </div>
  );
}


export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
