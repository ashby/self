import getSelf from '../../';
import * as api from 'src/api';
import { 
    expectEmptyShieldsExcept, 
    expectEmptyPartsExcept
} from 'app-test-utils';
import {
    BOUNDARY_FIXTURE
} from '../__fixtures__/';

const testGuardSummon = async ( Ash, boundary ) => {
    await Ash.summonGuard();
    const parts = Guard.seeParts();
    expect( parts.mouth.anger ).toEqual( boundary );
    expect( parts.face.selfPity ).toEqual( boundary );
    expect( parts.mouth.anger ).toEqual( boundary );
    const shields = Guard.seeShields();
    expect( shields.denial.armor ).toEqual( boundary );
    expect( shields.confusion.armor ).toEqual( boundary );
    const constructs = Guard.seeConstructs();
    expect( constructs.gate.boundary ).toEqual( boundary );

    expect( api.putAnger ).toBeCalled();
    expect( api.putSelfPity ).toBeCalled();
    expect( api.putArmor ).toBeCalled();
    expect( api.postBoundary ).toBeCalled();
}

const testGuardDismiss = async ( Ash, boundary ) => {
    await Ash.dismissGuard( boundary );
    expect( global.Guard ).toBe( undefined );

    expect( api.deleteBoundary ).toBeCalled();
    expect( api.deleteArmor ).toBeCalled();
    expect( api.deleteAnger ).toBeCalled();
    expect( api.deleteSelfPity ).toBeCalled();

    const shields = Ash.seeShields();
    expectEmptyShieldsExcept( [], shields );
    const parts = Ash.seeParts();
    expectEmptyPartsExcept( [], parts );
}

describe( 'Summoner::', () => {
    let Ash;
    const { BOUNDARY } = BOUNDARY_FIXTURE;
    beforeEach( () => {
        Ash = getSelf();
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( BOUNDARY ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( BOUNDARY ) );
        spyOn( api, 'putArmor' ).and.returnValue( Promise.resolve( BOUNDARY ) );
        spyOn( api, 'postBoundary' ).and.returnValue( Promise.resolve( BOUNDARY ) );
        spyOn( api, 'deleteBoundary' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'deleteArmor' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'deleteAnger' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'deleteSelfPity' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'postVulnerability' ).and.returnValue( Promise.resolve( BOUNDARY ) );
        spyOn( api, 'getVulnerability' ).and.returnValue( Promise.resolve( BOUNDARY ) );
    } );
    it( 'can summon Guard', async () => {
        await testGuardSummon( Ash, BOUNDARY );
        expect.assertions( 10 );
    } );
    it( 'can dismiss Guard', async () => {
        await testGuardSummon( Ash, BOUNDARY );
        await testGuardDismiss( Ash, BOUNDARY );
        expect.assertions( 26 );
    } );
    it( 'can summon a Guard, then dismiss it, then create another', async () => {
        await testGuardSummon( Ash, BOUNDARY );
        await testGuardDismiss( Ash, BOUNDARY );
        await testGuardSummon( Ash, BOUNDARY );
        expect.assertions( 36 );
    } );
} );