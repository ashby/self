import Smith from '../Smith';
import * as api from 'src/api';
import { EMPTY_ACTION } from 'src/constants';

const OLD_ANGER = 'everything';
const ANGER = 'unrequited';
const NEW_ANGER = 'acknowledgement';

describe( 'Smith armor::', () => {
    let Ash, parts, partKeys, brainAnger, gutAnger, mouthAnger, expectEmptyPartsExcept;
    beforeEach( () => {
        Ash = new Smith();
        parts = Ash.seeActions();
        partKeys = Object.keys( parts );
        brainAnger = [ OLD_ANGER, ANGER, NEW_ANGER ];
        gutAnger = [ ANGER ];
        mouthAnger = [ ANGER, NEW_ANGER ];
        spyOn( api, 'getAnger' ).and.returnValue( Promise.resolve( brainAnger ) );
        spyOn( api, 'postAnger' ).and.returnValue( Promise.resolve( gutAnger ) );
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( mouthAnger ) );
        spyOn( api, 'deleteAnger' ).and.returnValue( Promise.resolve( [] ) );
        expectEmptyPartsExcept = ( fullParts = [] ) => {
            partKeys = partKeys.filter( part => !fullParts.includes( part ) );
            partKeys.forEach( part => expect( parts[ part ] ).toEqual( EMPTY_PART ) );
        };
    } )
    it( 'gets anger from the brain', async () => {
        expect.assertions( 2 + partKeys.length - 1 );
        await Ash.getAnger();
        expect( api.getAnger ).toBeCalled();
        expect( Ash.brain.anger ).toEqual( brainAnger );
        expectEmptyPartsExcept( [ 'brain' ] );
    } );
    it( 'creates anger in the gut', async () => {
        expect.assertions( 2 + partKeys.length - 1 );
        await Ash.createAnger( ANGER );
        expect( api.postAnger ).toBeCalled(); 
        expect( Ash.gut.anger ).toEqual( gutAnger );
        expectEmptyPartsExcept( [ 'gut' ] );
    } );
    it( 'updates anger in the mouth', async () => {
        expect.assertions( 3 + partKeys.length - 2 );
        await Ash.createAnger( ANGER );
        await Ash.updateAnger( NEW_ANGER );
        expect( api.putAnger ).toBeCalled();
        expect( Ash.gut.anger ).toEqual( gutAnger );
        expect( Ash.mouth.anger ).toEqual( mouthAnger );
        expectEmptyPartsExcept( [ 'gut', 'mouth' ] );
    } );
    it( 'deletes anger from brain, gut and mouth', async () => {
        expect.assertions( 4 + partKeys.length );
        await Ash.createAnger( ANGER );
        await Ash.updateAnger( NEW_ANGER );
        await Ash.getAnger();
        expect( Ash.gut.anger ).toEqual( gutAnger );
        expect( Ash.mouth.anger ).toEqual( mouthAnger );
        expect( Ash.brain.anger ).toEqual( brainAnger );
        await Ash.removeAnger();
        expect( api.deleteAnger ).toBeCalled();
        await expectEmptyPartsExcept();
    } );
} );