import config from '../config';
const { HIGHER_POWER_PATH } = config;

export const getSelfPity = async path => fetch( `${HIGHER_POWER_PATH}/${path}/selfpity` );
export const postSelfPity = ( path, selfpity ) => fetch( `${HIGHER_POWER_PATH}/${path}/selfpity`, { method: 'post', body: selfpity } );
export const putSelfPity = ( path, selfpity ) => fetch( `${HIGHER_POWER_PATH}/${path}/selfpity`, { method: 'put', body: selfpity } );
export const deleteSelfPity = async path => fetch( `${HIGHER_POWER_PATH}/${path}/selfpity`, { method: 'delete' } );