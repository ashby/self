import { 
    EMPTY_PART,
    EMPTY_SHIELD,
    EMPTY_VIRTUE,
    EMPTY_CONSTRUCT
} from 'src/constants';

export const expectEmptyPartsExcept = ( fullParts = [], parts = {} ) => {
    const partKeys = Object.keys( parts ).filter( part => !fullParts.includes( part ) );
    partKeys.forEach( part => expect( parts[ part ] ).toEqual( EMPTY_PART ) );
};

export const expectEmptyShieldsExcept = ( fullShields = [], shields = {} ) => {
    const shieldKeys = Object.keys( shields ).filter( part => !fullShields.includes( part ) );
    shieldKeys.forEach( shield => expect( shields[ shield ] ).toEqual( EMPTY_SHIELD ) );
};

export const expectEmptyVirtuesExcept = ( fullVirtues = [], virtues = {} ) => {
    const virtueKeys = Object.keys( virtues ).filter( virtue => !fullVirtues.includes( virtue ) );
    virtueKeys.forEach( virtue => expect( virtues[ virtue ] ).toEqual( EMPTY_VIRTUE ) );
};

export const expectEmptyConstructsExcept = ( fullConstructs = [], constructs = {} ) => {
    const constructKeys = Object.keys( constructs ).filter( virtue => !fullConstructs.includes( virtue ) );
    constructKeys.forEach( construct => expect( constructs[ construct ] ).toEqual( EMPTY_CONSTRUCT ) );
};