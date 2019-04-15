import Self from './Self';
import 'src/utils/handle-guard';
import * as isEqual from 'lodash/isEqual';

export default class Summoner extends Self {
    public summonGuard = async ( boundary ) => {
        global.getGuardian();
        await Guard.buildBoundary( boundary );
        return Promise.resolve( boundary );
    }
    public dismissGuard = async ( boundary ) => {
        const Guard = global.Guard;
        const hasGuard = !!Guard && isEqual( Guard.gate.boundary, boundary );
        if( hasGuard ) {
            await Guard.removeBoundary();
            global.removeGuardian();
            return Promise.resolve( true );
        } else {
            return false;
        }
    }
}