import config from '../config';
const { HIGHER_POWER_PATH } = config;

export const getAnger = async path => fetch( `${HIGHER_POWER_PATH}/${path}/anger` );
export const postAnger = async ( path, anger ) => fetch( `${HIGHER_POWER_PATH}/${path}/anger`, { method: 'post', body: anger } );
export const putAnger = async ( path, anger ) => fetch( `${HIGHER_POWER_PATH}/${path}/anger`, { method: 'put', body: anger } );
export const deleteAnger = async path => fetch( `${HIGHER_POWER_PATH}/${path}/anger`, { method: 'delete' } );
