import Summoner from './Summoner';
import 'src/utils/handle-knight';
import * as isEqual from 'lodash/isEqual';

export default class Congrerant extends Summoner {
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