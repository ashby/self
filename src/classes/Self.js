import * as api from '../api';
export default class Self {
    brain = { path: undefined }
    face = { path: undefined }
    heart = { path: undefined }
    sternum = { path: undefined }
    gut = { path: undefined }
    skin = { path: undefined }
    constructor() {
        console.log( this );
    }
    getAnger = async () => api.getAnger( this.brain.path )
                        .then( response => this.brain = { ...this.brain, ...response.json } )
    createAnger = async fear => api.postAnger( this.gut.path, fear )
                        .then( response => this.heart = { ...this.heart, ...response.json } )
    updateAnger = async fear => api.putAnger( this.heart.path, fear )
                        .then( response => this.brain = { ...this.brain, ...response.json } )
    removeAnger = async () => apiDeleteAnger( this.heart.path )
                        .then( () => [ 'brain', 'heart', 'gut' ].map( organ => this[ organ ] = { path: undefined } ) )
    getSelfPity = async () => api.getSelfPity( this.brain.path )
                        .then( response => this.brain = { ...this.brain, ...response.json } )
    createSelfPity = async sadness => api.postSelfPity( this.sternum.path, sadness )
                        .then( response => this.face = { ...this.face, ...response.json } )
    updateSelfPity = async sadness => api.putSelfPity( this.face.path, sadness )
                        .then( response => this.brain = { ...this.brain, ...response.json } )
    removeSelfPity = async () => api.deletePity( this.face.path )
                        .then( () => [ 'brain', 'sternum', 'face' ].map( organ => this[ organ ] = { path: undefined } ) )                       
                           
}