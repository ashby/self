import config from '../config';
const { HIGHER_POWER_PATH } = config;

export const getCompassion = async path => 
    fetch( `${HIGHER_POWER_PATH}/${path}/compassion` );
export const postCompassion = async ( path, compassion ) => 
    fetch( `${HIGHER_POWER_PATH}/${path}/compassion`, { method: 'post', body: compassion } );
export const putCompassion = async ( path, compassion ) => 
    fetch( `${HIGHER_POWER_PATH}/${path}/compassion`, { method: 'put', body: compassion } );
export const deleteCompassion = async path => fetch( `${HIGHER_POWER_PATH}/${path}/compassion`, { method: 'delete' } );