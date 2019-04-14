import getSelf from '../../';
import * as api from 'src/api';
import { expectEmptyPartsExcept, expectEmptyShieldsExcept } from 'app-test-utils';
import { RESENTMENT_TYPE_SADNESS } from 'src/constants';

const OLD_ARMOR = 'your mom';
const ARMOR = '_';
const NEW_ARMOR = 'i\'m fine';

describe( 'Smith armor::', () => {{}
    let Ash, shields, shieldKeys, sarcasmArmor, silenceArmor, denialArmor, handleShieldsExceptions;
    beforeEach( () => {
        Ash = getSelf();
        shields = Ash.seeShields();
        shieldKeys = Object.keys( shields );
        sarcasmArmor = [ OLD_ARMOR, ARMOR, NEW_ARMOR ];
        silenceArmor = [ ARMOR ];
        denialArmor = [ ARMOR, NEW_ARMOR ];
        spyOn( api, 'getArmor' ).and.returnValue( Promise.resolve( sarcasmArmor ) );
        spyOn( api, 'postArmor' ).and.returnValue( Promise.resolve( silenceArmor ) );
        spyOn( api, 'putArmor' ).and.returnValue( Promise.resolve( denialArmor ) );
        spyOn( api, 'deleteArmor' ).and.returnValue( Promise.resolve( [] ) );
        handleShieldsExceptions = ( fullShields ) => expectEmptyShieldsExcept( fullShields, shields );
    } )
    it( 'can handle armor', async () => {
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( denialArmor ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( denialArmor ) );
        let armor;
        armor = await Ash.createArmor( ARMOR );
        expect( armor ).toEqual( silenceArmor );
        armor = await Ash.updateArmor( NEW_ARMOR, RESENTMENT_TYPE_SADNESS );
        expect( armor ).toEqual( denialArmor );
        armor = await Ash.getArmor();
        expect( armor ).toEqual( sarcasmArmor );
        expect.assertions( 3 );
    } )
    it( 'gets armor in the form of sarcasm', async () => {
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( sarcasmArmor ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( sarcasmArmor ) );
        await Ash.getArmor();
        expect( api.getArmor ).toBeCalled();
        expect( Ash.sarcasm.armor ).toEqual( sarcasmArmor );
        handleShieldsExceptions( [ 'sarcasm' ] );
        expect.assertions( 2 + shieldKeys.length - 1 );
    } );
    it( 'creates armor in the form of silence', async () => {
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( silenceArmor ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( silenceArmor ) );
        await Ash.createArmor( ARMOR );
        expect( api.postArmor ).toBeCalled(); 
        expect( Ash.silence.armor ).toEqual( silenceArmor );
        handleShieldsExceptions( [ 'silence' ] );
        expect.assertions( 2 + shieldKeys.length - 1 );
    } );
    it( 'updates armor in the form of denial and confusion', async () => {
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( denialArmor ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( denialArmor ) );
        await Ash.createArmor( ARMOR );
        await Ash.updateArmor( NEW_ARMOR, RESENTMENT_TYPE_SADNESS );
        expect( api.putArmor ).toBeCalled();
        expect( Ash.silence.armor ).toEqual( silenceArmor );
        expect( Ash.denial.armor ).toEqual( denialArmor );
        expect( Ash.confusion.armor ).toEqual( denialArmor );
        handleShieldsExceptions( [ 'silence', 'denial', 'confusion' ] );
        expect.assertions( 3 + shieldKeys.length - 2 );
    } );
    it( 'deletes armor forms of sarcasm, silence and denial', async () => {
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( denialArmor ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( denialArmor ) );
        spyOn( api, 'deleteAnger' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'deleteSelfPity' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'postVulnerability' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'getVulnerability' ).and.returnValue( Promise.resolve( sarcasmArmor ) );
        await Ash.createArmor( ARMOR );
        await Ash.updateArmor( NEW_ARMOR, RESENTMENT_TYPE_SADNESS );
        await Ash.getArmor();
        expect( Ash.silence.armor ).toEqual( silenceArmor );
        expect( Ash.denial.armor ).toEqual( denialArmor );
        expect( Ash.sarcasm.armor ).toEqual( sarcasmArmor );
        const vulnerability = await Ash.removeArmor();
        expect( vulnerability ).toEqual( sarcasmArmor );
        shields = Ash.seeShields();
        handleShieldsExceptions();
        const parts = Ash.seeParts();
        const partKeys = Object.keys( parts );
        expectEmptyPartsExcept( [], parts );
        expect.assertions( 4 + shieldKeys.length + partKeys.length );
    } );
} );