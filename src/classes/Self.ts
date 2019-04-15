import Guardian from './Guardian';
import * as api from 'src/api';
import { 
    EMPTY_PART,
    RESENTMENT_TYPE_ACKNOWLEDGE,
    RESENTMENT_TYPE_ANGER, 
    RESENTMENT_TYPE_SADNESS, 
    RESENTMENT_TYPE_FEAR  
} from 'src/constants';
import * as union from 'lodash/union';

export default class Self {
    route = undefined
    set path( route ) { this.route = route }
    brain = { ...EMPTY_PART }
    face = { ...EMPTY_PART }
    mouth = { ...EMPTY_PART }
    heart = { ...EMPTY_PART }
    sternum = { ...EMPTY_PART }
    gut = { ...EMPTY_PART }
    skin = { ...EMPTY_PART }
    get self() { return this.seeParts() }
    seeParts = () => ( { 
        brain: this.brain,
        face: this.face,
        mouth: this.mouth,
        heart: this.heart,
        sternum: this.sternum,
        gut: this.gut,
        skin: this.skin 
    } )
    public handleResentment = async ( type, resentment = '' ) => {
        let anger = [], selfPity  = [];
        switch( type ) {
            case RESENTMENT_TYPE_ACKNOWLEDGE:
                const removeAnger = await this.removeAnger();
                const removeSelfPity = await this.removeSelfPity();
                const acknowledgement = await Promise.all( [ removeAnger, removeSelfPity ] ).then( () => true );
                return Promise.resolve( acknowledgement );
            case RESENTMENT_TYPE_SADNESS:
            case RESENTMENT_TYPE_FEAR:
                selfPity = await this.increaseSelfPity( resentment );
                return Promise.resolve( { anger, selfPity } );
            case RESENTMENT_TYPE_ANGER:
            default:
                const increaseAnger = await this.increaseAnger( resentment );
                const increaseSelfPity = await this.increaseSelfPity( resentment);
                [ anger, selfPity ] = await Promise.all( [ increaseAnger, increaseSelfPity ] );
                return Promise.resolve( { anger, selfPity } );
        }
    }
    public handleAnger = ( part, anger ) => {
        this[ part ].anger = union( this[ part ].anger, anger );
        return Promise.resolve( this[ part ].anger );
    }
    accessAnger = async () => api.getAnger( this.route )
                        .then( response => this.handleAnger( 'brain', response ) )
    createAnger = async anger => api.postAnger( this.route, anger )
                        .then( response => this.handleAnger( 'gut', response ) )
    increaseAnger = async anger => api.putAnger( this.route, anger )
                        .then( response => this.handleAnger( 'mouth', response ) )
    removeAnger = async () => api.deleteAnger( this.route )
                        .then( () => {
                            const parts = [ 'brain', 'gut', 'mouth' ].map( part => this[ part ].anger = { ...EMPTY_PART }.anger );
                            return Promise.resolve( parts );
                        } )
    public handleSelfPity( part, selfPity ) {
        this[ part ].selfPity = union( this[ part ].selfPity, selfPity );
        return Promise.resolve( this[ part ].selfPity ); 
    }
    accessSelfPity = async () => api.getSelfPity( this.route )
                        .then( response => this.handleSelfPity( 'brain', response ) )
    createSelfPity = async selfPity => api.postSelfPity( this.route, selfPity )
                        .then( response => this.handleSelfPity( 'sternum', response ) )
    increaseSelfPity = async selfPity => api.putSelfPity( this.route, selfPity )
                        .then( response => this.handleSelfPity( 'face', response ) )
    removeSelfPity = async () => api.deleteSelfPity( this.route )
                        .then( () => {
                            const parts = [ 'brain', 'sternum', 'face' ].map( part => this[ part ].selfPity = { ...EMPTY_PART }.selfPity );
                            return Promise.resolve( parts );
                        } )                            
}
