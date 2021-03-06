import Self from './Self';
import 'src/utils/handle-guard';

export default class Summoner extends Self {
    public summonGuard = async ( boundary ) => {
        global.getGuardian();
        await Guard.buildBoundary( boundary );
        return Promise.resolve( boundary );
    }
    public dismissGuard = async () => {
        await Guard.removeBoundary();
        global.removeGuardian();
        return Promise.resolve( true );
    }
}