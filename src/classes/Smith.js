import Self from './Self';
import * as api from '../api/armor';
import * as vulnerabilityApi from '../api/vulnerability';

const PATH_NULL = { path: null };

export default class Smith extends Self{
    silence = PATH_NULL
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
    getArmor = async () => api.getArmor( this.skin.path );
    createArmor = async armor => api.postArmor( this.silence.path, armor )
        .then( response => { this.sarcasm = response; Promise.Reject( this.sarcasm) } )
        .catch( error => this.handleResentment( error ) );
    updateArmor = async armor => api.putArmor( this.brain.path, armor )
        .then( async response => { 
            const confusion = await Promise.all( [ this.getSelfPity(), this.getAnger() ] );
            return confusion.map( confusion => this.confusion = { ...this.confusion, ...response, confusion } );
        } )
        .catch( error => this.handleResentment( error ) );
    deleteArmor = async () => api.deleteArmor( this.brain.path )
        .then( () => {
            const acceptance = await this.handleResentment( 'acceptance' );
            await acceptance.map( async resentment => vulnerabilityApi.postVulnerability( this.heart.path, resentment ) );
            [ 'silence', 'sarcasm', 'confusion' ].map( armorType => this[ armorType ] = PATH_NULL )
            return vulnerabilityApi.getVulnerability( this.heart.path );
        } )
    // deleteVulnerability = async () => vulnerabilityApi.deleteVulnerability( this.silence.path )
    //             .catch( error => this.handleResentment( error ) )
}

const Ash = new Smith();
Ash.silence.path = '_';
Ash.createArmor( 'fear of being in love' );
Ash.updateArmor( 'acknowledgment' );
Ash.deleteArmor();