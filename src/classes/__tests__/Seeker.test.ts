import Seeker from '../Seeker';
import * as api from 'src/api';
import { EMPTY_VIRTUE } from 'src/constants';

const OLD_VULNERABILITY = 'fear';
const VULNERABILITY = 'in love';
const NEW_VULNERABILITY = 'acknowledgement';
const BOUNDARY = 'boundary';

const expectEmptyVirtuesExcept = ( fullVirtues = [], virtueKeys = [], virtues = {} ) => {
    virtueKeys = virtueKeys.filter( virtue => !fullVirtues.includes( virtue ) );
    virtueKeys.forEach( virtue => expect( virtues[ virtue ] ).toEqual( EMPTY_VIRTUE ) );
};

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
        spyOn( api, 'postAnger' ).and.returnValue( Promise.resolve( boundary ) );
        spyOn( api, 'postSelfPity' ).and.returnValue( Promise.resolve( boundary ) );
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
    it( 'can handle boundary', async () => {
        let vulnerability;
        vulnerability = await Ash.removeVulnerability();
        expect( vulnerability ).toEqual( { anger: boundary, selfPity: boundary } );
    } );
    it( 'gets vulnerability from the mind', async () => {
        await Ash.getVulnerability();
        expect( api.getVulnerability ).toBeCalled();
        expect( Ash.mind.vulnerability ).toEqual( mindVulnerability );
        handleVirtuesExceptions( [ 'mind' ] );
        expect.assertions( 2 + virtueKeys.length - 1 );
    } );
    it( 'creates vulnerability in the soul', async () => {
        await Ash.createVulnerability( VULNERABILITY );
        expect( api.postVulnerability ).toBeCalled(); 
        expect( Ash.soul.vulnerability ).toEqual( soulVulnerability );
        handleVirtuesExceptions( [ 'soul' ] );
        expect.assertions( 2 + virtueKeys.length - 1 );
    } );
    it( 'updates vulnerability in the love', async () => {
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
        await Ash.removeVulnerability();
        expect( api.deleteVulnerability ).toBeCalled();
        await handleVirtuesExceptions( [ 'mind', 'soul', 'love' ] );
        const parts = Ash.seeParts();
        expect( parts.gut.anger ).toEqual( boundary );
        expect( parts.sternum.selfPity ).toEqual( boundary );
        expect.assertions( 6 + virtueKeys.length - 3 );
    } );
} );