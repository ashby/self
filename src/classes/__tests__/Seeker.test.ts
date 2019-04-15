import getSelf from '../../';
import * as api from 'src/api';
import { expectEmptyVirtuesExcept } from 'app-test-utils';
import {
    ACCEPTANCE_FIXTURE,
    VULNERABILITY_FIXTURE,
    BOUNDARY_FIXTURE
} from '../__fixtures__/';

const fixture = {
    ...VULNERABILITY_FIXTURE,
    ...ACCEPTANCE_FIXTURE,
    ...BOUNDARY_FIXTURE
};

const testSeeker = ( type ) => {
    let Ash, virtues, virtueKeys, handleVirtuesExceptions;
    const apiType = type.charAt(0).toUpperCase() + type.slice(1);
    const FIXTURE_TYPE = type.toUpperCase();
    beforeEach( () => {
        Ash = getSelf();
        virtues = Ash.seeVirtues();
        virtueKeys = Object.keys( virtues );
        spyOn( api, 'getVulnerability' ).and.returnValue( Promise.resolve( fixture.MIND_VULNERABILITY ) );
        spyOn( api, 'postVulnerability' ).and.returnValue( Promise.resolve( fixture.SOUL_VULNERABILITY ) );
        spyOn( api, 'putVulnerability' ).and.returnValue( Promise.resolve( fixture.LOVE_VULNERABILITY ) );
        spyOn( api, 'deleteVulnerability' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'getAcceptance' ).and.returnValue( Promise.resolve( fixture.MIND_VULNERABILITY ) );
        spyOn( api, 'postAcceptance' ).and.returnValue( Promise.resolve( fixture.SOUL_VULNERABILITY ) );
        spyOn( api, 'putAcceptance' ).and.returnValue( Promise.resolve( fixture.LOVE_VULNERABILITY ) );
        spyOn( api, 'deleteAcceptance' ).and.returnValue( Promise.resolve() );
        handleVirtuesExceptions = ( fullVirtues ) => expectEmptyVirtuesExcept( fullVirtues, virtues );
    } )
    it( `can handle ${type} truth`, async () => {
        let truth;
        truth = await Ash[ `create${apiType}` ]( fixture[ FIXTURE_TYPE ] );
        expect( truth ).toEqual( fixture[ `SOUL_${FIXTURE_TYPE}` ] );
        truth = await Ash.increaseVulnerability( fixture[ `NEW_${FIXTURE_TYPE}` ] );
        expect( truth ).toEqual( fixture[ `LOVE_${FIXTURE_TYPE}` ] );
        truth = await Ash.accessVulnerability();
        expect( truth ).toEqual( fixture[ `MIND_${FIXTURE_TYPE}` ] );
        //expect.assertions( 3 ); wth
    } );
    it( `accesses ${type} from the mind`, async () => {
        await Ash[ `access${apiType}` ]();
        expect( api[ `get${apiType}` ] ).toBeCalled();
        expect( Ash.mind[ type ] ).toEqual( fixture[  `MIND_${FIXTURE_TYPE}` ] );
        handleVirtuesExceptions( [ 'mind' ] );
        expect.assertions( 2 + virtueKeys.length - 1 );
    } );
    it( `creates ${type} in soul`, async () => {
        await Ash[ `create${apiType}` ]( fixture[ FIXTURE_TYPE ] );
        expect( api[ `post${apiType}` ] ).toBeCalled(); 
        expect( Ash.soul[ type ] ).toEqual( fixture[ `SOUL_${FIXTURE_TYPE}` ] );
        handleVirtuesExceptions( [ 'soul' ] );
        expect.assertions( 2 + virtueKeys.length - 1 );
    } );
    it( `increases ${type} in love`, async () => {
        await Ash[ `create${apiType}` ]( fixture[ FIXTURE_TYPE ] );
        await Ash[ `increase${apiType}` ]( fixture[ `NEW_${FIXTURE_TYPE}` ] );
        expect( api[ `put${apiType}` ] ).toBeCalled();
        expect( Ash.soul[ type ] ).toEqual( fixture[ `SOUL_${FIXTURE_TYPE}` ] );
        expect( Ash.love[ type ] ).toEqual( fixture[ `LOVE_${FIXTURE_TYPE}` ] );
        handleVirtuesExceptions( [ 'soul', 'love' ] );
        expect.assertions( 3 + virtueKeys.length - 2 );
    } );
    it( `removes ${type} from mind, soul and love`, async () => {
        await Ash[ `create${apiType}` ]( fixture[ FIXTURE_TYPE ] );
        await Ash[ `increase${apiType}` ]( fixture[ `NEW_${FIXTURE_TYPE}` ] );
        await Ash[ `access${apiType}` ]();
        expect( Ash.soul[ type ] ).toEqual( fixture[ `SOUL_${FIXTURE_TYPE}` ] );
        expect( Ash.love[ type ] ).toEqual( fixture[ `LOVE_${FIXTURE_TYPE}` ] );
        expect( Ash.mind[ type ] ).toEqual( fixture[ `MIND_${FIXTURE_TYPE}` ] );
        await Ash[ `remove${apiType}` ]();
        expect( api[ `delete${apiType}` ] ).toBeCalled();
        await handleVirtuesExceptions();
        expect.assertions( 4 + virtueKeys.length );
    } );
};

describe( 'Seeker vulnerability ::', () => testSeeker( 'vulnerability' ) );
describe( 'Seeker acceptance ::', () => testSeeker( 'acceptance' ) );

describe( 'Seeker Guard::', () => {
    let Ash, handleVirtuesExceptions, virtues, virtueKeys;
    const { 
        VULNERABILITY, 
        NEW_VULNERABILITY, 
        BOUNDARY, 
        MIND_VULNERABILITY, 
        SOUL_VULNERABILITY, 
        LOVE_VULNERABILITY 
    } = fixture;
    beforeEach( () => {
        Ash = getSelf();
        virtues = Ash.seeVirtues();
        virtueKeys = Object.keys( virtues );
        spyOn( api, `getVulnerability` ).and.returnValue( Promise.resolve( MIND_VULNERABILITY ) );
        spyOn( api, `postVulnerability` ).and.returnValue( Promise.resolve( SOUL_VULNERABILITY ) );
        spyOn( api, `putVulnerability` ).and.returnValue( Promise.resolve( LOVE_VULNERABILITY ) );
        spyOn( api, `deleteVulnerability` ).and.returnValue( Promise.reject( [ BOUNDARY ] ) );
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( BOUNDARY ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( BOUNDARY ) );
        spyOn( api, 'putArmor' ).and.returnValue( Promise.resolve( BOUNDARY ) );
        spyOn( api, 'postBoundary' ).and.returnValue( Promise.resolve( BOUNDARY ) );
        spyOn( api, 'getAcceptance' ).and.returnValue( Promise.resolve( BOUNDARY ) );
        spyOn( api, 'deleteBoundary' ).and.returnValue( Promise.resolve() );
        handleVirtuesExceptions = ( fullVirtues ) => expectEmptyVirtuesExcept( fullVirtues, virtues );
    } );
    it( 'can summon guard', async () => {
        await Ash.createVulnerability( VULNERABILITY );
        await Ash.increaseVulnerability( NEW_VULNERABILITY );
        await Ash.accessVulnerability();
        expect( Ash.soul.vulnerability ).toEqual( SOUL_VULNERABILITY );
        expect( Ash.love.vulnerability ).toEqual( LOVE_VULNERABILITY );
        expect( Ash.mind.vulnerability ).toEqual( MIND_VULNERABILITY );
        await Ash.removeVulnerability();
        expect( api.deleteVulnerability ).toBeCalled();
        await handleVirtuesExceptions( [ 'mind', 'soul', 'love' ] );
        const parts = Guard.seeParts();
        expect( parts.mouth.anger ).toEqual( BOUNDARY );
        expect( parts.face.selfPity ).toEqual( BOUNDARY );
        const constructs = Guard.seeConstructs();
        expect( constructs.gate.boundary ).toEqual( BOUNDARY );
        expect.assertions( 7 + virtueKeys.length - 3 );
    } );
    it( 'can dismiss Guard and have acceptance in the mind', async () => {
        await Ash.removeVulnerability();
        const parts = Guard.seeParts();
        expect( parts.mouth.anger ).toEqual( BOUNDARY );
        expect( parts.face.selfPity ).toEqual( BOUNDARY );
        const constructs = Guard.seeConstructs();
        expect( constructs.gate.boundary ).toEqual( BOUNDARY );
        await Ash.accessAcceptance();
        expect( global.Guard ).toBe( undefined );
        const virtues = Ash.seeVirtues();
        expect( api.deleteBoundary ).toBeCalled();
        expect( virtues.mind.acceptance ).toEqual( BOUNDARY );
        expect.assertions( 6 );
    } );
} );
