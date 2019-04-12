const apiGetAnger = async path => fetch( `https://self/${path}/anger` );
const apiPostAnger = async ( path, anger ) => fetch( `https://self/${path}/anger`, { method: 'post', body: anger } );
const apiPutAnger = async ( path, anger ) => fetch( `https://self/${path}/anger`, { method: 'put', body: anger } );
const apiDeleteAnger = async path => fetch( `https://self/${path}/anger`, { method: 'delete' } );
const apiGetSelfPity = async path => fetch( `https://self/${path}/selfpity` );
const apiPostSelfPity = ( path, selfpity ) => fetch( `https://self/${path}/selfpity`, { method: 'post', body: selfpity } );
const apiPutSelfPity = ( path, selfpity ) => fetch( `https://self/${path}/selfpity`, { method: 'put', body: selfpity } );
const apiDeleteSelfPity = async path => fetch( `https://self/${path}/selfpity`, { method: 'delete' } );
class Self {
    brain = { path: undefined }
    face = { path: undefined }
    heart = { path: undefined }
    sternum = { path: undefined }
    gut = { path: undefined }
    constructor() {
        console.log( this );
    }
    getAnger = async () => apiGetAnger( this.brain.path )
                        .then( response => this.brain = { ...this.brain, ...response.json } )
    createAnger = async fear => apiPostAnger( this.gut.path, fear )
                        .then( response => this.heart = { ...this.heart, ...response.json } )
    updateAnger = async fear => apiPutAnger( this.heart.path, fear )
                        .then( response => this.brain = { ...this.brain, ...response.json } )
    removeAnger = async () => apiDeleteAnger( this.heart.path )
                        .then( () => [ 'brain', 'heart', 'gut' ].map( organ => this[ organ ] = {} ) )
    getSelfPity = async () => apiGetSelfPity( this.brain.path )
                        .then( response => this.brain = { ...this.brain, ...response.json } )
    createSelfPity = async sadness => apiPostSelfPity( this.sternum.path, sadness )
                        .then( response => this.face = { ...this.face, ...response.json } )
    updateSelfPity = async sadness => apiPutSelfPity( this.face.path, sadness )
                        .then( response => this.brain = { ...this.brain, ...response.json } )
    removeSelfPity = async () => apiDeletePity( this.face.path )
                        .then( () => [ 'brain', 'sternum', 'face' ].map( organ => this[ organ ] = {} ) )                       
                           
}
let Ash = new Self();
//Ash.createAnger( 'everything' ).then( () => this.updateAnger( 'acknowledgement' ) );
Ash.createSelfPity( 'in MN' ).then( () => this.deleteSelfPity() );

const apiDeleteVulnerability = async path => fetch( 
    `https://self/${path}/vulnerability`, 
    { method: 'delete' } 
).then( response  => Promise.reject( response ) );
class Smith extends Self{
    silence = { path: null }
    createResentment = error => {
        switch( error ) {
            case 'sadness':
            case 'fear':
                this.createSelfPity( error );
            case 'anger':
            default:
                this.createAnger( error )
                    .then( response => this.createSelfPity( response ) );
        }
    }
    deleteVulnerability = async () => apiDeleteVulnerability( this.silence.path )
                .catch( error => this.createResentment( error ) )
}
Ash = new Smith();
Ash.deleteVulnerability();