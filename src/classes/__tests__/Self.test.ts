import Self from '../Self';
import * as api from 'src/api';
import { 
    EMPTY_PART,
    RESENTMENT_TYPE_DEFAULT,
    RESENTMENT_TYPE_ACKNOWLEDGE,
    RESENTMENT_TYPE_ANGER, 
    RESENTMENT_TYPE_SADNESS, 
    RESENTMENT_TYPE_FEAR 
} from 'src/constants';

const OLD_ANGER = 'everything';
const ANGER = 'unrequited';
const NEW_ANGER = 'acknowledgement';

const OLD_SELF_PITY = 'in MN';
const SELF_PITY = 'can\'t leave';
const NEW_SELF_PITY = 'lonely';

const RESENTMENT = 'in MN';

const expectEmptyPartsExcept = ( fullParts = [], partKeys = [], parts = {} ) => {
    partKeys = partKeys.filter( part => !fullParts.includes( part ) );
    partKeys.forEach( part => expect( parts[ part ] ).toEqual( EMPTY_PART ) );
};

describe( 'Self ::', () => {
    let Ash, parts, partResentment;
    beforeEach( () => {
        Ash = new Self();
        parts = Ash.seeParts();
        partKeys = Object.keys( parts );
        partResentment = [ RESENTMENT ];
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( partResentment ) );
        spyOn( api, 'deleteAnger' ).and.returnValue( Promise.resolve() );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( partResentment ) );
        spyOn( api, 'deleteSelfPity' ).and.returnValue( Promise.resolve() );
    } );
    it( 'can handle default resentment', async () => {
        const resentment = await Ash.handleResentment( RESENTMENT_TYPE_DEFAULT, RESENTMENT );
        expect( resentment ).toEqual( { anger: partResentment, selfPity: partResentment } );
        expect( Ash.mouth.anger ).toEqual( partResentment );
        expect( Ash.face.selfPity ).toEqual( partResentment );
    } );
    it( 'can handle anger resentment', async () => {
        const resentment = await Ash.handleResentment( RESENTMENT_TYPE_ANGER, RESENTMENT );
        expect( resentment ).toEqual( { anger: partResentment, selfPity: partResentment } );
        expect( Ash.mouth.anger ).toEqual( partResentment );
        expect( Ash.face.selfPity ).toEqual( partResentment );
    } );
    it( 'can handle sadness resentment', async () => {
        const resentment = await Ash.handleResentment( RESENTMENT_TYPE_SADNESS, RESENTMENT );
        expect( resentment ).toEqual( { anger: [], selfPity: partResentment } );
        expect( Ash.face.selfPity ).toEqual( partResentment );
    } );
    it( 'can handle fear resentment', async () => {
        const resentment = await Ash.handleResentment( RESENTMENT_TYPE_FEAR, RESENTMENT );
        expect( resentment ).toEqual( { anger: [], selfPity: partResentment } );
        expect( Ash.face.selfPity ).toEqual( partResentment );
    } );
    it( 'can acknowledge resentment', async () => {
        await Ash.handleResentment( RESENTMENT_TYPE_ACKNOWLEDGE );
        expect( Ash.mouth.anger ).toEqual( [] );
        expect( Ash.face.selfPity ).toEqual( [] );
    } );
} );

describe( 'Self anger ::', () => {
    let Ash, parts, partKeys, brainAnger, gutAnger, mouthAnger, handlePartsExceptions;
    beforeEach( () => {
        Ash = new Self();
        parts = Ash.seeParts();
        partKeys = Object.keys( parts );
        brainAnger = [ OLD_ANGER, ANGER, NEW_ANGER ];
        gutAnger = [ ANGER ];
        mouthAnger = [ ANGER, NEW_ANGER ];
        spyOn( api, 'getAnger' ).and.returnValue( Promise.resolve( brainAnger ) );
        spyOn( api, 'postAnger' ).and.returnValue( Promise.resolve( gutAnger ) );
        spyOn( api, 'putAnger' ).and.returnValue( Promise.resolve( mouthAnger ) );
        spyOn( api, 'deleteAnger' ).and.returnValue( Promise.resolve( [] ) );
        handlePartsExceptions = ( fullParts ) => expectEmptyPartsExcept( fullParts, partKeys, parts );
    } )
    it( 'can handle anger', async () => {
        let anger;
        anger = await Ash.createAnger( ANGER );
        expect( anger ).toEqual( gutAnger );
        anger = await Ash.updateAnger( NEW_ANGER );
        expect( anger ).toEqual( mouthAnger );
        anger = await Ash.getAnger();
        expect( anger ).toEqual( brainAnger );
        expect.assertions( 3 );
    } );
    it( 'gets anger from the brain', async () => {
        await Ash.getAnger();
        expect( api.getAnger ).toBeCalled();
        expect( Ash.brain.anger ).toEqual( brainAnger );
        handlePartsExceptions( [ 'brain' ] );
        expect.assertions( 2 + partKeys.length - 1 );
    } );
    it( 'creates anger in the gut', async () => {
        await Ash.createAnger( ANGER );
        expect( api.postAnger ).toBeCalled(); 
        expect( Ash.gut.anger ).toEqual( gutAnger );
        handlePartsExceptions( [ 'gut' ] );
        expect.assertions( 2 + partKeys.length - 1 );
    } );
    it( 'updates anger in the mouth', async () => {
        await Ash.createAnger( ANGER );
        await Ash.updateAnger( NEW_ANGER );
        expect( api.putAnger ).toBeCalled();
        expect( Ash.gut.anger ).toEqual( gutAnger );
        expect( Ash.mouth.anger ).toEqual( mouthAnger );
        handlePartsExceptions( [ 'gut', 'mouth' ] );
        expect.assertions( 3 + partKeys.length - 2 );
    } );
    it( 'removes anger from brain, gut and mouth', async () => {
        await Ash.createAnger( ANGER );
        await Ash.updateAnger( NEW_ANGER );
        await Ash.getAnger();
        expect( Ash.gut.anger ).toEqual( gutAnger );
        expect( Ash.mouth.anger ).toEqual( mouthAnger );
        expect( Ash.brain.anger ).toEqual( brainAnger );
        await Ash.removeAnger();
        expect( api.deleteAnger ).toBeCalled();
        await handlePartsExceptions();
        expect.assertions( 4 + partKeys.length );
    } );
} );

describe( 'Self self-pity ::', () => {
    let Ash, parts, partKeys, brainSelfPity, sternumSelfPity, faceSelfPity, handlePartsExceptions;
    beforeEach( () => {
        Ash = new Self();
        parts = Ash.seeParts();
        partKeys = Object.keys( parts );
        brainSelfPity = [ OLD_SELF_PITY, SELF_PITY, NEW_SELF_PITY ];
        sternumSelfPity = [ SELF_PITY ];
        faceSelfPity = [ SELF_PITY, NEW_SELF_PITY ];
        spyOn( api, 'getSelfPity' ).and.returnValue( Promise.resolve( brainSelfPity ) );
        spyOn( api, 'postSelfPity' ).and.returnValue( Promise.resolve( sternumSelfPity ) );
        spyOn( api, 'putSelfPity' ).and.returnValue( Promise.resolve( faceSelfPity ) );
        spyOn( api, 'deleteSelfPity' ).and.returnValue( Promise.resolve( [] ) );
        handlePartsExceptions = ( fullParts ) => expectEmptyPartsExcept( fullParts, partKeys, parts );
    } )
    it( 'can handle self-pity', async () => {
        let selfPity;
        selfPity = await Ash.createSelfPity( ANGER );
        expect( selfPity ).toEqual( sternumSelfPity );
        selfPity = await Ash.updateSelfPity( NEW_ANGER );
        expect( selfPity ).toEqual( faceSelfPity );
        selfPity = await Ash.getSelfPity();
        expect( selfPity ).toEqual( brainSelfPity );
        expect.assertions( 3 );
    } );
    it( 'gets self-pity from the brain', async () => {
        await Ash.getSelfPity();
        expect( api.getSelfPity ).toBeCalled();
        expect( Ash.brain.selfPity ).toEqual( brainSelfPity );
        handlePartsExceptions( [ 'brain' ] );
        expect.assertions( 2 + partKeys.length - 1 );
    } );
    it( 'creates self-pity in the sternum', async () => {
        await Ash.createSelfPity( SELF_PITY );
        expect( api.postSelfPity ).toBeCalled(); 
        expect( Ash.sternum.selfPity ).toEqual( sternumSelfPity );
        handlePartsExceptions( [ 'sternum' ] );
        expect.assertions( 2 + partKeys.length - 1 );
    } );
    it( 'updates self-pity in the face', async () => {
        await Ash.createSelfPity( SELF_PITY );
        await Ash.updateSelfPity( NEW_SELF_PITY );
        expect( api.putSelfPity ).toBeCalled();
        expect( Ash.sternum.selfPity ).toEqual( sternumSelfPity );
        expect( Ash.face.selfPity ).toEqual( faceSelfPity );
        handlePartsExceptions( [ 'sternum', 'face' ] );
        expect.assertions( 3 + partKeys.length - 2 );
    } );
    it( 'removes self-pity from brain, sternum and face', async () => {
        await Ash.createSelfPity( SELF_PITY );
        await Ash.updateSelfPity( NEW_SELF_PITY );
        await Ash.getSelfPity();
        expect( Ash.sternum.selfPity ).toEqual( sternumSelfPity );
        expect( Ash.face.selfPity ).toEqual( faceSelfPity );
        expect( Ash.brain.selfPity ).toEqual( brainSelfPity );
        await Ash.removeSelfPity();
        expect( api.deleteSelfPity ).toBeCalled();
        await handlePartsExceptions();
        expect.assertions( 4 + partKeys.length );
    } );
} );