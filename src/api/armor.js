export const getArmor = async path => fetch( `https://self/${path}/armor` );
export const postArmor = async ( path, armor ) => fetch( `https://self/${path}/armor`, { method: 'post', body: armor } );
export const putArmor = async ( path, armor ) => fetch( `https://self/${path}/armor`, { method: 'put', body: armor } );
export const deleteArmor = async path => fetch( `https://self/${path}/armor`, { method: 'delete' } );