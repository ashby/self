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
        const parts = Guard.seeParts();
        expect( parts.mouth.anger ).toEqual( BOUNDARY );
        expect( parts.face.selfPity ).toEqual( BOUNDARY );
        expect( parts.mouth.anger ).toEqual( BOUNDARY );
        const shields = Guard.seeShields();
        expect( shields.denial.armor ).toEqual( BOUNDARY );
        expect( shields.confusion.armor ).toEqual( BOUNDARY );
        const constructs = Guard.seeConstructs();
        expect( constructs.gate.boundary ).toEqual( BOUNDARY );
        expect.assertions( 6 );
    } );
    it( 'can dismiss Guard', async () => {
        await Ash.dismissGuard();
    } )
} );