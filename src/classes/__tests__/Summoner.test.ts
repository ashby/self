import Summoner from '../Summoner';
import * as api from 'src/api';
import {
    BOUNDARY_FIXTURE
} from '../__fixtures__/';

describe( 'Summoner::', () => {
    let Ash;
    const { BOUNDARY } = BOUNDARY_FIXTURE;
    beforeEach( () => {
        Ash = new Summoner();
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( BOUNDARY ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( BOUNDARY ) );
        spyOn( api, 'putArmor' ).and.returnValue( Promise.resolve( BOUNDARY ) );
        spyOn( api, 'postBoundary' ).and.returnValue( Promise.resolve( BOUNDARY ) );
    } );
    it( 'can summon Guard', async () => {
        await Ash.summonGuard();
        //console.log( Guard );
    } );
} );