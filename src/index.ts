import { Seeker, Summoner } from 'src/classes';
import { OldSmith } from 'src/classes/Smith';

const getSelf = () => {
    const smith = new OldSmith( 'strength' );
    const seeker = new Seeker( 'experience' );
    const summoner = new Summoner();
    return Object.assign( seeker, smith, summoner );
}
export default getSelf;
