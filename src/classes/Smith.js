import Self from './Self';
import * as api from '../api/armor';
import * as vulnerabilityApi from '../api/vulnerability';

const PATH_NULL = { path: null };

export default class Smith extends Self{
    silence = PATH_NULL
    denial = PATH_NULL
    sarcasm = PATH_NULL
    confusion = PATH_NULL
    handleResentment = async resentment => {
        switch( resentment ) {
            case 'acceptance':
                return Promise.all( [ this.deleteSelfPity(), this.deleteAnger() ] );
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
        .catch( error => this.sarcasm = handleResentment( error ) )
    createArmor = async armor => api.postArmor( this.silence.path, armor )
        .then( response => Promise.Reject( response ) )
        .catch( error => this.denial = this.handleResentment( error ) );
    updateArmor = async armor => api.putArmor( this.brain.path, armor )
        .then( async () => { 
            const confusion = await Promise.all( [ this.getSelfPity(), this.getAnger() ] );
            Promise.reject( confusion );
        } )
        .catch( error => this.confusion = this.handleResentment( error ) );
    deleteArmor = async () => api.deleteArmor( this.heart.path )
        .then( () => {
            const acceptance = await this.handleResentment( 'acceptance' );
            await acceptance.map( async resentment => vulnerabilityApi.postVulnerability( this.heart.path, resentment ) );
            [ 'silence', 'sarcasm', 'confusion' ].map( armorType => this[ armorType ] = PATH_NULL )
            return vulnerabilityApi.getVulnerability( this.heart.path );
        } )
    // deleteVulnerability = async () => vulnerabilityApi.deleteVulnerability( this.silence.path )
    //             .catch( error => this.handleResentment( error ) )
}
