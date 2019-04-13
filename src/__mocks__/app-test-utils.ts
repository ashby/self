import { 
    EMPTY_PART,
    EMPTY_SHIELD,
    EMPTY_VIRTUE,
    EMPTY_CONSTRUCT
} from 'src/constants';

export const expectEmptyPartsExcept = ( fullParts = [], partKeys = [], parts = {} ) => {
    partKeys = partKeys.filter( part => !fullParts.includes( part ) );
    partKeys.forEach( part => expect( parts[ part ] ).toEqual( EMPTY_PART ) );
};

export const expectEmptyShieldsExcept = ( fullShields = [], shieldKeys = [], shields = {} ) => {
    shieldKeys = shieldKeys.filter( part => !fullShields.includes( part ) );
    shieldKeys.forEach( shield => expect( shields[ shield ] ).toEqual( EMPTY_SHIELD ) );
};

export const expectEmptyVirtuesExcept = ( fullVirtues = [], virtueKeys = [], virtues = {} ) => {
    virtueKeys = virtueKeys.filter( virtue => !fullVirtues.includes( virtue ) );
    virtueKeys.forEach( virtue => expect( virtues[ virtue ] ).toEqual( EMPTY_VIRTUE ) );
};

export const expectEmptyConstructsExcept = ( fullConstructs = [], constructKeys = [], constructs = {} ) => {
    constructKeys = constructKeys.filter( virtue => !fullConstructs.includes( virtue ) );
    constructKeys.forEach( construct => expect( constructs[ construct ] ).toEqual( EMPTY_CONSTRUCT ) );
};