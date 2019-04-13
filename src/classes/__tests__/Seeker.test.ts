import Seeker from '../Seeker';
import * as api from 'src/api';
import { expectEmptyVirtuesExcept } from 'app-test-utils';

const OLD_VULNERABILITY = 'fear';
const VULNERABILITY = 'in love';
const NEW_VULNERABILITY = 'acknowledgement';
const BOUNDARY = 'boundary';

describe( 'Seeker vulnerability ::', () => {
    let Ash, virtues, virtueKeys, mindVulnerability, soulVulnerability, loveVulnerability, boundary, handleVirtuesExceptions;
    beforeEach( () => {
        Ash = new Seeker();
        virtues = Ash.seeVirtues();
        virtueKeys = Object.keys( virtues );
        mindVulnerability = [ OLD_VULNERABILITY, VULNERABILITY, NEW_VULNERABILITY ];
        soulVulnerability = [ VULNERABILITY ];
        loveVulnerability = [ VULNERABILITY, NEW_VULNERABILITY ];
        boundary = [ BOUNDARY ];
        spyOn( api, 'getVulnerability' ).and.returnValue( Promise.resolve( mindVulnerability ) );
        spyOn( api, 'postVulnerability' ).and.returnValue( Promise.resolve( soulVulnerability ) );
        spyOn( api, 'putVulnerability' ).and.returnValue( Promise.resolve( loveVulnerability ) );
        spyOn( api, 'deleteVulnerability' ).and.returnValue( Promise.reject( boundary ) );
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( boundary ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( boundary ) );
        spyOn( api, 'putArmor' ).and.returnValue( Promise.resolve( boundary ) );
        spyOn( api, 'postBoundary' ).and.returnValue( Promise.resolve( boundary ) );
        handleVirtuesExceptions = ( fullVirtues ) => expectEmptyVirtuesExcept( fullVirtues, virtueKeys, virtues );
    } )
    it( 'can handle vulnerability', async () => {
        let vulnerability;
        vulnerability = await Ash.createVulnerability( VULNERABILITY );
        expect( vulnerability ).toEqual( soulVulnerability );
        vulnerability = await Ash.updateVulnerability( NEW_VULNERABILITY );
        expect( vulnerability ).toEqual( loveVulnerability );
        vulnerability = await Ash.getVulnerability();
        expect( vulnerability ).toEqual( mindVulnerability );
        expect.assertions( 3 );
    } );
    it( 'can summon guard and create boundary', async () => {
        let boundary;
        boundary = await Ash.removeVulnerability();
        expect( boundary ).toEqual( boundary );
    } );
    it( 'gets vulnerability from the mind', async () => {
        await Ash.getVulnerability();
        expect( api.getVulnerability ).toBeCalled();
        expect( Ash.mind.vulnerability ).toEqual( mindVulnerability );
        handleVirtuesExceptions( [ 'mind' ] );
        expect.assertions( 2 + virtueKeys.length - 1 );
    } );
    it( 'creates vulnerability in soul', async () => {
        await Ash.createVulnerability( VULNERABILITY );
        expect( api.postVulnerability ).toBeCalled(); 
        expect( Ash.soul.vulnerability ).toEqual( soulVulnerability );
        handleVirtuesExceptions( [ 'soul' ] );
        expect.assertions( 2 + virtueKeys.length - 1 );
    } );
    it( 'updates vulnerability in love', async () => {
        await Ash.createVulnerability( VULNERABILITY );
        await Ash.updateVulnerability( NEW_VULNERABILITY );
        expect( api.putVulnerability ).toBeCalled();
        expect( Ash.soul.vulnerability ).toEqual( soulVulnerability );
        expect( Ash.love.vulnerability ).toEqual( loveVulnerability );
        handleVirtuesExceptions( [ 'soul', 'love' ] );
        expect.assertions( 3 + virtueKeys.length - 2 );
    } );
    it( 'removes vulnerability from mind, soul and love', async () => {
        await Ash.createVulnerability( VULNERABILITY );
        await Ash.updateVulnerability( NEW_VULNERABILITY );
        await Ash.getVulnerability();
        expect( Ash.soul.vulnerability ).toEqual( soulVulnerability );
        expect( Ash.love.vulnerability ).toEqual( loveVulnerability );
        expect( Ash.mind.vulnerability ).toEqual( mindVulnerability );
        const Guard = await Ash.removeVulnerability();
        expect( api.deleteVulnerability ).toBeCalled();
        await handleVirtuesExceptions( [ 'mind', 'soul', 'love' ] );
        const parts = Guard.seeParts();
        expect( parts.mouth.anger ).toEqual( boundary );
        expect( parts.face.selfPity ).toEqual( boundary );
        expect.assertions( 6 + virtueKeys.length - 3 );
    } );
} );