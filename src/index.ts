import { Smith, Seeker, Summoner } from 'src/classes';

const getSelf = () => {
    const smith = new Smith();
    const seeker = new Seeker();
    const summoner = new Summoner();
    return Object.assign( seeker, smith, summoner );
}
export default getSelf;
