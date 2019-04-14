import { Smith, Seeker } from 'src/classes';

const getSelf = () => {
    const smith = new Smith();
    const seeker = new Seeker();
    return Object.assign( seeker, smith );
}
export default getSelf;
