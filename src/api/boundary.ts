import config from '../config';
const { HIGHER_POWER_PATH } = config;

export const getBoundary = async path => fetch( `${HIGHER_POWER_PATH}/${path}/boundary` );
export const postBoundary = async ( path, boundary ) => fetch( `${HIGHER_POWER_PATH}/${path}/boundary`, { method: 'post', body: boundary } );
export const putBoundary = async ( path, boundary ) => fetch( `${HIGHER_POWER_PATH}/${path}/boundary`, { method: 'put', body: boundary } );
export const deleteBoundary = async path => fetch( `${HIGHER_POWER_PATH}/${path}/boundary`, { method: 'delete' } );