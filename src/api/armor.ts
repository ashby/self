import config from '../config';
const { HIGHER_POWER_PATH } = config;

export const getArmor = async path => fetch( `${HIGHER_POWER_PATH}/${path}/armor` );
export const postArmor = async ( path, armor ) => fetch( `${HIGHER_POWER_PATH}/${path}/armor`, { method: 'post', body: armor } );
export const putArmor = async ( path, armor ) => fetch( `${HIGHER_POWER_PATH}/${path}/armor`, { method: 'put', body: armor } );
export const deleteArmor = async path => fetch( `${HIGHER_POWER_PATH}/${path}/armor`, { method: 'delete' } );