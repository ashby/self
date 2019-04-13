import Guardian from '../Guardian';
import * as api from 'src/api';
import { 
    expectEmptyPartsExcept, 
    expectEmptyConstructsExcept, 
    expectEmptyShieldsExcept 
} from 'app-test-utils';
import { RESENTMENT_TYPE_SADNESS } from 'src/constants';

const OLD_BOUNDARY = 'meeting kids';
const BOUNDARY = 'opening up';
const NEW_BOUNDARY = 'acknowledge';

describe( 'Guardian boundary::', () => {{}
    let Ash, constructs, constructKeys, towerBoundary, gateBoundary, wallBoundary, handleConstructsExceptions;
    beforeEach( () => {
        Ash = new Guardian();
        constructs = Ash.seeConstructs();
        constructKeys = Object.keys( constructs );
        towerBoundary = [ OLD_BOUNDARY, BOUNDARY, NEW_BOUNDARY ];
        gateBoundary = [ BOUNDARY ];
        wallBoundary = [ BOUNDARY, NEW_BOUNDARY ];
        spyOn( api, 'getBoundary' ).and.returnValue( Promise.resolve( towerBoundary ) );
        spyOn( api, 'postBoundary' ).and.returnValue( Promise.resolve( gateBoundary ) );
        spyOn( api, 'putBoundary' ).and.returnValue( Promise.resolve( wallBoundary ) );
        spyOn( api, 'deleteBoundary' ).and.returnValue( Promise.resolve( [] ) );
        handleConstructsExceptions = ( fullConstructs ) => expectEmptyConstructsExcept( fullConstructs, constructKeys, constructs );
    } )
    it( 'can handle boundary', async () => {
        let boundary;
        boundary = await Ash.createBoundary( BOUNDARY );
        expect( boundary ).toEqual( gateBoundary );
        boundary = await Ash.updateBoundary( NEW_BOUNDARY );
        expect( boundary ).toEqual( wallBoundary );
        boundary = await Ash.getBoundary();
        expect( boundary ).toEqual( towerBoundary );
        expect.assertions( 3 );
    } )
    it( 'can build a boundary', async () => {
        spyOn( api, 'putArmor' ).and.returnValue( Promise.resolve( wallBoundary ) );
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( wallBoundary ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( wallBoundary ) );
        await Ash.buildBoundary( BOUNDARY );
        const parts = Ash.seeParts();
        expect( parts.mouth.anger ).toEqual( wallBoundary );
        const shields = Ash.seeShields();
        expect( shields.denial.armor ).toEqual( wallBoundary );
        expect( shields.confusion.armor ).toEqual( wallBoundary );
        expect.assertions( 3 );
    })
    it( 'gets boundary with tower', async () => {
        await Ash.getBoundary();
        expect( api.getBoundary ).toBeCalled();
        expect( Ash.tower.boundary ).toEqual( towerBoundary );
        handleConstructsExceptions( [ 'tower' ] );
        expect.assertions( 2 + constructKeys.length - 1 );
    } );
    it( 'creates boundary with gate', async () => {
        await Ash.createBoundary( BOUNDARY );
        expect( api.postBoundary ).toBeCalled(); 
       expect( Ash.gate.boundary ).toEqual( gateBoundary );
        handleConstructsExceptions( [ 'gate' ] );
        expect.assertions( 2 + constructKeys.length - 1 );
    } );
    it( 'updates boundary with wall', async () => {
        await Ash.createBoundary( BOUNDARY );
        await Ash.updateBoundary( NEW_BOUNDARY, RESENTMENT_TYPE_SADNESS );
        expect( api.putBoundary ).toBeCalled();
        expect( Ash.gate.boundary ).toEqual( gateBoundary );
        expect( Ash.wall.boundary ).toEqual( wallBoundary );
        handleConstructsExceptions( [ 'gate', 'wall' ] );
        expect.assertions( 3 + constructKeys.length - 2 );
    } );
    it( 'deletes boundaries of tower, gate and wall', async () => {
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( wallBoundary ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( wallBoundary ) );
        spyOn( api, 'deleteAnger' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'deleteSelfPity' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'postVulnerability' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'getVulnerability' ).and.returnValue( Promise.resolve( towerBoundary ) );
        spyOn( api, 'deleteArmor' ).and.returnValue( Promise.resolve() );
        await Ash.createBoundary( BOUNDARY );
        await Ash.updateBoundary( NEW_BOUNDARY, RESENTMENT_TYPE_SADNESS );
        await Ash.getBoundary();
        expect( Ash.gate.boundary ).toEqual( gateBoundary );
        expect( Ash.wall.boundary ).toEqual( wallBoundary );
        expect( Ash.tower.boundary ).toEqual( towerBoundary );
        const boundary = await Ash.removeBoundary();
        expect( boundary ).toEqual( towerBoundary );
        constructs = Ash.seeConstructs();
        handleConstructsExceptions();
        const parts = Ash.seeParts();
        const partKeys = Object.keys( parts );
        expectEmptyPartsExcept( [], partKeys, parts );
        const shields = Ash.seeShields();
        const shieldKeys = Object.keys( shields );
        expectEmptyShieldsExcept( [], shieldKeys, shields );
        expect.assertions( 4 + constructKeys.length + partKeys.length + shieldKeys.length );
    } );
} );