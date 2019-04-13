import * as api from 'src/api';
import { EMPTY_PART } from 'src/constants';

export default class Self {
    route = undefined
    brain = { ...EMPTY_PART }
    face = { ...EMPTY_PART }
    mouth = { ...EMPTY_PART }
    heart = { ...EMPTY_PART }
    sternum = { ...EMPTY_PART }
    gut = { ...EMPTY_PART }
    skin = { ...EMPTY_PART }
    get self() { return this.seeParts() }
    set path( route ) { this.route = route }
    seeParts = () => ( { 
        brain: this.brain,
        face: this.face,
        mouth: this.mouth,
        heart: this.heart,
        sternum: this.sternum,
        gut: this.gut,
        skin: this.skin 
    } )
    setAnger( part, anger ) { this[ part ].anger = this[ part ].anger.concat( anger ) }
    getAnger = async () => api.getAnger( this.route )
                        .then( response => this.setAnger( 'brain', response ) )
    createAnger = async anger => api.postAnger( this.route, anger )
                        .then( response => this.setAnger( 'gut', response )  )
    updateAnger = async anger => api.putAnger( this.route, anger )
                        .then( response => this.setAnger( 'mouth', response )  )
    removeAnger = async () => api.deleteAnger( this.route )
                        .then( () => [ 'brain', 'gut', 'mouth' ].map( part => this[ part ].anger = { ...EMPTY_PART }.anger ) )
    setSelfPity( part, selfPity ) { this[ part ].anger = this[ part ].anger.concat( selfPity ) }
    getSelfPity = async () => api.getSelfPity( this.route )
                        .then( response => this.setSelfPity( 'brain', response ) )
    createSelfPity = async selfPity => api.postSelfPity( this.route, selfPity )
                        .then( response => this.setSelfPity( 'sternum', response ) )
    updateSelfPity = async selfPity => api.putSelfPity( this.route, selfPity )
                        .then( response => this.setSelfPity( 'face', response ) )
    removeSelfPity = async () => api.deleteSelfPity( this.route )
                        .then( () => [ 'brain', 'sternum', 'face' ].map( part => this[ part ].selfPity = { ...EMPTY_PART }.selfPity ) )                       
                           
}