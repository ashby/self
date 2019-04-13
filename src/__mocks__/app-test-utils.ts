import { 
    EMPTY_PART,
    EMPTY_SHIELD
} from 'src/constants';

export const expectEmptyPartsExcept = ( fullParts = [], partKeys = [], parts = {} ) => {
    partKeys = partKeys.filter( part => !fullParts.includes( part ) );
    partKeys.forEach( part => expect( parts[ part ] ).toEqual( EMPTY_PART ) );
};

export const expectEmptyShieldsExcept = ( fullShields = [], shieldKeys = [], shields = {} ) => {
    shieldKeys = shieldKeys.filter( part => !fullShields.includes( part ) );
    shieldKeys.forEach( shield => expect( shields[ shield ] ).toEqual( EMPTY_SHIELD ) );
};