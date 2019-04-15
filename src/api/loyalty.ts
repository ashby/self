import config from '../config';
const { HIGHER_POWER_PATH } = config;

export const getLoyalty = async path => 
    fetch( `${HIGHER_POWER_PATH}/${path}/loyalty` );
export const postLoyalty = async ( path, loyalty ) => 
    fetch( `${HIGHER_POWER_PATH}/${path}/loyalty`, { method: 'post', body: loyalty } );
export const putLoyalty = async ( path, loyalty ) => 
    fetch( `${HIGHER_POWER_PATH}/${path}/loyalty`, { method: 'put', body: loyalty } );
export const deleteLoyalty = async path => fetch( `${HIGHER_POWER_PATH}/${path}/loyalty`, { method: 'delete' } );