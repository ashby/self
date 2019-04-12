export const getAnger = async path => fetch( `https://self/${path}/anger` );
export const postAnger = async ( path, anger ) => fetch( `https://self/${path}/anger`, { method: 'post', body: anger } );
export const putAnger = async ( path, anger ) => fetch( `https://self/${path}/anger`, { method: 'put', body: anger } );
export const deleteAnger = async path => fetch( `https://self/${path}/anger`, { method: 'delete' } );
export const getSelfPity = async path => fetch( `https://self/${path}/selfpity` );
export const postSelfPity = ( path, selfpity ) => fetch( `https://self/${path}/selfpity`, { method: 'post', body: selfpity } );
export const putSelfPity = ( path, selfpity ) => fetch( `https://self/${path}/selfpity`, { method: 'put', body: selfpity } );
export const deleteSelfPity = async path => fetch( `https://self/${path}/selfpity`, { method: 'delete' } );