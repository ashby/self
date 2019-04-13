import Self from './';
import * as api from 'src/api';
import { EMPTY_ACTION } from 'src/constants';

export default class Smith extends Self {
    silence = { ...EMPTY_ACTION }
    denial = { ...EMPTY_ACTION }
    sarcasm = { ...EMPTY_ACTION }
    confusion = { ...EMPTY_ACTION }
    get smith() { return this.seeShields() }
    seeShields = () => ( { 
        silence: this.silence,
        denial: this.denial,
        sarcasm: this.sarcasm,
        confusion: this.confusion
    } )
    getArmor = async () => api.getArmor( this.path )
        .then( response => Promise.reject( response ) )
        .catch( error => this.sarcasm.armor = this.handleResentment( error ) )
    createArmor = async armor => api.postArmor( this.route, armor )
        .then( response => Promise.reject( response ) )
        .catch( error => this.denial.armor = this.handleResentment( error ) );
    updateArmor = async armor => api.putArmor( this.route, armor )
        .then( async () => {
            let selfPityPromise = this.getSelfPity();
            let angerPromise = this.getAnger();
            const [ selfPity, anger ] = await Promise.all( [ selfPityPromise, angerPromise ] );
            Promise.reject( [ selfPity, anger ] );
        } )
        .catch( errors => this.confusion.armor = errors.map( error => this.handleResentment( error ) ) )
    removeArmor = async () => api.deleteArmor( this.route )
        .then( async () => {
            const acceptance = await this.handleResentment( 'acceptance' );
            await acceptance.map( async resentment => api.postVulnerability( this.route, resentment ) );
            [ 'silence', 'denial', 'sarcasm', 'confusion' ].map( armorType => this[ armorType ] = { ...EMPTY_ACTION } )
            return api.getVulnerability( this.path );
        } )
        .catch( error => this.handleResentment( error ) )
}
