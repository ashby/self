import config from '../config';
const { HIGHER_POWER_PATH } = config;

export const getAcceptance = async path => 
    fetch( `${HIGHER_POWER_PATH}/${path}/acceptance` );
export const postAcceptance = async ( path, acceptance ) => 
    fetch( `${HIGHER_POWER_PATH}/${path}/armor`, { method: 'post', body: acceptance } );
export const putAcceptance = async ( path, acceptance ) => 
    fetch( `${HIGHER_POWER_PATH}/${path}/armor`, { method: 'put', body: acceptance } );
export const deleteAcceptance = async path => fetch( 
    `${HIGHER_POWER_PATH}/${path}/armor`, 
    { method: 'delete' } 
).catch( error  => Promise.reject( error ) );