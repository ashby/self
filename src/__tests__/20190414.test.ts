import getSelf from '../';
import * as api from 'src/api';
import { 
    expectEmptyPartsExcept,
    expectEmptyVirtuesExcept,
    expectEmptyShieldsExcept,
    expectEmptyConstructsExcept
} from 'app-test-utils';

const ARMOR = 'patiently waiting to hear';
const SELF_PITY = 'maybe I\'m too intense';
const ANGER = 'i deserve better';
const VULNERABILITY = 'i care and worry';

const BOUNDARY = 'doesn\'t affect me';

describe( '20190414 Self::', () => {
    let Ash;
    beforeEach( () => {
        Ash = getSelf();
    } );
    it( 'can assign smith to seeker and see parts, shields and virtues', () => {
        const parts = Ash.seeParts();
        const shields = Ash.seeShields();
        const virtues = Ash.seeVirtues();
        expect( Object.keys( parts ) ).toHaveLength( 7 );
        expect( Object.keys( shields ) ).toHaveLength( 4 );
        expect( Object.keys( virtues ) ).toHaveLength( 3 );
        expect.assertions( 3 );
    } );
    it( 'can create Guard, manage silence, remove anger and self pity, and be ready with some vulnerability', async () => {
        spyOn( api, 'postBoundary' ).and.returnValue( Promise.resolve( [ BOUNDARY ] ) );
        spyOn( api, 'postArmor' ).and.returnValue( Promise.resolve( [ ARMOR ] ) );
        spyOn( api, 'putArmor' ).and.returnValue( Promise.resolve( [ ARMOR ] ) );
        spyOn( api, 'postAnger' ).and.returnValue( Promise.resolve( [ ANGER ] ) );
        spyOn( api, 'postSelfPity' ).and.returnValue( Promise.resolve( [ SELF_PITY ] ) );
        spyOn( api, 'deleteAnger' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'deleteSelfPity' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( [ BOUNDARY ] ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( [ BOUNDARY ] ) );
        spyOn( api, 'getVulnerability' ).and.returnValue( Promise.resolve( [ VULNERABILITY ] ) );
        spyOn( api, 'deleteVulnerability' ).and.returnValue( Promise.reject( [ VULNERABILITY ] ) );

        await Ash.createAnger( ANGER );
        await Ash.createSelfPity( SELF_PITY );
        await Ash.createArmor( ARMOR );
        await Ash.removeVulnerability();

        expect( Guard.gate.boundary ).toEqual( [ BOUNDARY ] );
        expect( Ash.gut.anger ).toEqual( [ ANGER ] );
        expect( Ash.silence.armor ).toEqual( [ ARMOR ] );
        expect( Guard.face.selfPity ).toEqual( [ BOUNDARY ] );
        expect( Guard.mouth.anger ).toEqual( [ BOUNDARY ] );
        expect( Guard.denial.armor ).toEqual( [ ARMOR ] );
        expect( Guard.confusion.armor ).toEqual( [ ARMOR ] );

        const shields = Ash.seeShields();
        const shieldsCount = Object.keys( shields ).length -1;
        expectEmptyShieldsExcept( [ 'silence' ], shields );
        const guardShields = Guard.seeShields();
        const guardShieldsCount = Object.keys( guardShields ).length - 2;
        expectEmptyShieldsExcept( [ 'denial', 'confusion' ], guardShields );
        const guardConstructs = Guard.seeConstructs();
        const guardConstructsCount = Object.keys( guardConstructs ).length - 1;
        expectEmptyConstructsExcept( [ 'gate' ], guardConstructs )

        await Ash.getVulnerability();
        expect( Ash.mind.vulnerability ).toEqual( [ VULNERABILITY ] );
        const virtues = Ash.seeVirtues();
        const virtuesCount = Object.keys( virtues ).length - 1;
        expectEmptyVirtuesExcept( [ 'mind' ], virtues );

        await Ash.removeAnger();
        await Ash.removeSelfPity();
        await Guard.removeAnger();
        await Guard.removeSelfPity();
        const parts = Ash.seeParts();
        const partsCount = Object.keys( parts ).length;
        expectEmptyPartsExcept( [], parts );
        const guardParts = Guard.seeParts();
        const guartsPartsCount = Object.keys( guardParts ).length;
        expectEmptyPartsExcept( [], guardParts );

        expect( { parts,shields, virtues, guardParts, guardShields, guardConstructs } ).toMatchSnapshot();
        expect.assertions( 9 + virtuesCount + partsCount + guartsPartsCount + guardShieldsCount + shieldsCount + guardConstructsCount );
    } );

    it( 'can dismiss guard and create acceptance', () => {
        expect( true ).toEqual( false );
    } );
} );