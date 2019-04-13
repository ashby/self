import Self from './';
import * as api from '../api/armor';
import * as vulnerabilityApi from '../api/vulnerability';

const EMPTY_SMITH = { path: null, armor: {} };

export default class Smith extends Self {
    silence = EMPTY_SMITH
    denial = EMPTY_SMITH
    sarcasm = EMPTY_SMITH
    confusion = EMPTY_SMITH
    handleResentment = async resentment => {
        switch( resentment ) {
            case 'acceptance':
                return Promise.all( [ this.removeSelfPity(), this.removeAnger() ] );
            case 'sadness':
            case 'fear':
                return this.createSelfPity( resentment );
            case 'anger':
            default:
                return this.createAnger( resentment )
                    .then( response => this.createSelfPity( response ) );
        }
    }
    getArmor = async () => api.getArmor( this.skin.path )
        .then( response => Promise.reject( response ) )
        .catch( error => this.sarcasm.armor = this.handleResentment( error ) )
    createArmor = async armor => api.postArmor( this.silence.path, armor )
        .then( response => Promise.reject( response ) )
        .catch( error => this.denial.armor = this.handleResentment( error ) );
    updateArmor = async armor => api.putArmor( this.brain.path, armor )
        .then( async () => {
            let selfPityPromise = this.getSelfPity();
            let angerPromise = this.getAnger();
            const [ selfPity, anger ] = await Promise.all( [ selfPityPromise, angerPromise ] );
            Promise.reject( [ selfPity, anger ] );
        } )
        .catch( errors => this.confusion.armor = errors.map( error => this.handleResentment( error ) ) )
    deleteArmor = async () => api.deleteArmor( this.heart.path )
        .then( async () => {
            const acceptance = await this.handleResentment( 'acceptance' );
            await acceptance.map( async resentment => vulnerabilityApi.postVulnerability( this.heart.path, resentment ) );
            [ 'silence', 'denial', 'sarcasm', 'confusion' ].map( armorType => this[ armorType ] = EMPTY_SMITH )
            return vulnerabilityApi.getVulnerability( this.heart.path );
        } )
    // deleteVulnerability = async () => vulnerabilityApi.deleteVulnerability( this.silence.path )
    //             .catch( error => this.handleResentment( error ) )
}
