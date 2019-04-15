import config from '../config';
const { HIGHER_POWER_PATH } = config;

export const getCourage = async path => 
    fetch( `${HIGHER_POWER_PATH}/${path}/courage` );
export const postCourage = async ( path, courage ) => 
    fetch( `${HIGHER_POWER_PATH}/${path}/courage`, { method: 'post', body: courage } );
export const putCourage = async ( path, courage ) => 
    fetch( `${HIGHER_POWER_PATH}/${path}/courage`, { method: 'put', body: courage } );
export const deleteCourage = async path => fetch( `${HIGHER_POWER_PATH}/${path}/courage`, { method: 'delete' } );