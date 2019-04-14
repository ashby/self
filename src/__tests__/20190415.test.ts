import Smith from 'classes/Smith';
import Seeker from 'classes/Seeker';
import * as api from 'src/api';
import { 
    expectEmptyPartsExcept,
    expectEmptyVirtuesExcept,
    expectEmptyShieldsExcept,
    expectEmptyConstructsExcept
} from 'app-test-utils';

// const ARMOR = 'patiently waiting to hear';
// const SELF_PITY = 'maybe I\'m too intense';
// const ANGER = 'i deserve better';
// const VULNERABILITY = 'i care and worry';

// const BOUNDARY = 'doesn\'t affect me';

describe( '20190415 Self::', () => {
    let Ash;
    beforeEach( () => {
        const seeker = new Seeker();
        const smith = new Smith();
        Ash = Object.assign( seeker, smith );
    } );
    it( 'can dismiss guard and create acceptance', () => {
        expect( true ).toEqual( false );
    } );
} );