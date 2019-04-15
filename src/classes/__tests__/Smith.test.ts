import getSelf from '../../';
import Smith from '../Smith';
import * as api from 'src/api';
import { expectEmptyPartsExcept, expectEmptyShieldsExcept } from 'app-test-utils';
import { RESENTMENT_TYPE_SADNESS } from 'src/constants';
import { getShields } from 'src/utils/selectors';

const OLD_ARMOR = 'your mom';
const ARMOR = '_';
const NEW_ARMOR = 'i\'m fine';

const KEY = 'armor';
const ATTRIBUTES_NAME = 'shields'; 

describe( 'Smith armor::', () => {{}
    let Alcoholic, attributes, attributeKeys, sarcasmArmor, silenceArmor, denialArmor, handleShieldsExceptions;
    beforeEach( () => {
        Alcoholic = new Smith( 'strength' );
        attributes = Alcoholic.seeAttributes( ATTRIBUTES_NAME );
        attributeKeys = Object.keys( attributes );
        sarcasmArmor = [ OLD_ARMOR, ARMOR, NEW_ARMOR ];
        silenceArmor = [ ARMOR ];
        denialArmor = [ ARMOR, NEW_ARMOR ];
        spyOn( api, 'getArmor' ).and.returnValue( Promise.resolve( sarcasmArmor ) );
        spyOn( api, 'postArmor' ).and.returnValue( Promise.resolve( silenceArmor ) );
        spyOn( api, 'putArmor' ).and.returnValue( Promise.resolve( denialArmor ) );
        spyOn( api, 'deleteArmor' ).and.returnValue( Promise.resolve( [] ) );
        handleShieldsExceptions = ( fullShields ) => expectEmptyShieldsExcept( fullShields, attributes );
    } )
    it( 'can handle armor', async () => {
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( denialArmor ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( denialArmor ) );
        let armor;
        armor = await Alcoholic.createAction( KEY, ARMOR );
        expect( armor ).toEqual( silenceArmor );
        armor = await Alcoholic.increaseAction( KEY, NEW_ARMOR, RESENTMENT_TYPE_SADNESS );
        expect( armor ).toEqual( denialArmor );
        armor = await Alcoholic.accessAction( KEY );
        expect( armor ).toEqual( sarcasmArmor );
        expect.assertions( 3 );
    } )
    it( 'accesses armor in the form of sarcasm', async () => {
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( sarcasmArmor ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( sarcasmArmor ) );
        await Alcoholic.accessAction( KEY );
        expect( api.getArmor ).toBeCalled();
        expect( getShields( Alcoholic ).sarcasm.armor ).toEqual( sarcasmArmor );
        handleShieldsExceptions( [ 'sarcasm' ] );
        expect.assertions( 2 + attributeKeys.length - 1 );
    } );
    it( 'creates armor in the form of silence', async () => {
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( silenceArmor ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( silenceArmor ) );
        await Alcoholic.createAction( KEY, ARMOR );
        expect( api.postArmor ).toBeCalled(); 
        expect( getShields( Alcoholic ).silence.armor ).toEqual( silenceArmor );
        handleShieldsExceptions( [ 'silence' ] );
        expect.assertions( 2 + attributeKeys.length - 1 );
    } );
    it( 'increases armor in the form of denial and confusion', async () => {
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( denialArmor ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( denialArmor ) );
        await Alcoholic.createAction( KEY, ARMOR );
        await Alcoholic.increaseAction( KEY, NEW_ARMOR, RESENTMENT_TYPE_SADNESS );
        expect( api.putArmor ).toBeCalled();
        expect( getShields( Alcoholic ).silence.armor ).toEqual( silenceArmor );
        expect( getShields( Alcoholic ).denial.armor ).toEqual( denialArmor );
        expect( getShields( Alcoholic ).confusion.armor ).toEqual( denialArmor );
        handleShieldsExceptions( [ 'silence', 'denial', 'confusion' ] );
        expect.assertions( 3 + attributeKeys.length - 2 );
    } );
    fit( 'deletes armor forms of sarcasm, silence and denial', async () => {
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( denialArmor ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( denialArmor ) );
        spyOn( api, 'deleteAnger' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'deleteSelfPity' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'postVulnerability' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'getVulnerability' ).and.returnValue( Promise.resolve( sarcasmArmor ) );
        await Alcoholic.createAction( KEY, ARMOR );
        await Alcoholic.increaseAction( KEY, NEW_ARMOR, RESENTMENT_TYPE_SADNESS );
        await Alcoholic.accessAction( KEY );
        expect( getShields( Alcoholic ).silence.armor ).toEqual( silenceArmor );
        expect( getShields( Alcoholic ).denial.armor ).toEqual( denialArmor );
        expect( getShields( Alcoholic ).sarcasm.armor ).toEqual( sarcasmArmor );
        const vulnerability = await Alcoholic.removeAction( KEY );
        expect( vulnerability ).toEqual( sarcasmArmor );
        attributes = Alcoholic.seeAttributes( ATTRIBUTES_NAME );
        handleShieldsExceptions();
        const parts = Alcoholic.seeParts();
        const partKeys = Object.keys( parts );
        expectEmptyPartsExcept( [], parts );
        expect.assertions( 4 + attributeKeys.length + partKeys.length );
    } );
} );