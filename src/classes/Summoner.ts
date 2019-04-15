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
            return Promise.reject();
        }
    }
    public summonKnight = async ( loyalty ) => {
        global.getPaladin();
        await Knight.buildBoundary( loyalty );
        return Promise.resolve( loyalty );
    }
    public dismissKnight = async ( loyalty ) => {
        const Knight = global.Knight;
        const hasKnight = !!Knight && isEqual( Knight.pledge.loyalty, loyalty );
        if( hasKnight ) {
            await Knight.removeBoundary();
            global.removeGuardian();
            return Promise.resolve( true );
        } else {
            return Promise.reject();
        }
    }
}