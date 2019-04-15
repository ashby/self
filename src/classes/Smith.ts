import Self from './Self';
import Character from './Character';
import * as api from 'src/api';
import { 
    EMPTY_SHIELD,
    RESENTMENT_TYPE_ANGER,
    RESENTMENT_TYPE_FEAR,
    RESENTMENT_TYPE_ACKNOWLEDGE 
} from 'src/constants';
import * as union from 'lodash/union';

const SHIELDS_NAME = 'shields';

export default class Smith extends Character {
    EMPTY_ATTRIBUTE = EMPTY_SHIELD
    ATTRIBUTE = 'shield'
    ATTRIBUTES = [ 'silence', 'denial', 'sarcasm', 'confusion' ]
    ATTRIBUTES_NAME = SHIELDS_NAME
    API = [ 'armor' ]
    API_KEY = 'armor'
    ROUTE = 'strength'
    constructor( route ) {
        super();
        this.route = route;
        this.finishCharacterSheet();
    }
    accessActionThen = async response => Promise.reject( response )
    accessActionCatch = async error => this.handleAttribute( 'sarcasm', error, RESENTMENT_TYPE_ANGER )
    createActionThen = async response => Promise.reject( response )
    createActionCatch = async error => this.handleAttribute( 'silence', error, RESENTMENT_TYPE_FEAR )
    increaseActionThen = async ( response, resentment ) => {
        const armor = await this.handleAttribute( 'denial', response, resentment )
        return Promise.reject( armor );
    }
    increaseActionCatch = async ( error, resentment ) => this.handleAttribute( 'confusion', error, resentment ) 
    removeActionThen = async () => {
        const attributes = this.seeAttributes( SHIELDS_NAME );
        const attributeKeys = Object.keys( attributes );
        const acknowldegement = await this.handleResentment( RESENTMENT_TYPE_ACKNOWLEDGE );
        if ( acknowldegement ) {
            attributeKeys.map( async attribute => await api.postVulnerability( this.route, attribute ) );      
            attributeKeys.map( attribute => this[ attribute ] = { ...this.EMPTY_ATTRIBUTE } );
            const vulnerability = await api.getVulnerability( this.route );
            return Promise.resolve( vulnerability );
        }
    }
    removeActionCatch = async error => this.handleResentment( error )
}

export class OldSmith extends Self {
    constructor( route ) {
        super();
        this.route = route;
    }
    silence = { ...EMPTY_SHIELD }
    denial = { ...EMPTY_SHIELD }
    sarcasm = { ...EMPTY_SHIELD }
    confusion = { ...EMPTY_SHIELD }
    //get smith() { return this.seeShields() }
    seeShields = () => ( { 
        silence: this.silence,
        denial: this.denial,
        sarcasm: this.sarcasm,
        confusion: this.confusion
    } )
    public handleArmor = async ( shield, armor, type ) => {
        await this.handleResentment( type, armor );
        this[ shield ].armor = union( this[ shield ].armor, armor );
        return Promise.resolve( this[ shield ].armor );
    }
    accessArmor = async () => api.getArmor( this.route )
        .then( response => Promise.reject( response ) )
        .catch( async ( error ) => this.handleArmor( 'sarcasm', error, RESENTMENT_TYPE_ANGER ) )
    createArmor = async armor => api.postArmor( this.route, armor )
        .then( response => Promise.reject( response ) )
        .catch( error => this.handleArmor( 'silence', error, RESENTMENT_TYPE_FEAR ) )
    increaseArmor = async ( armor, type = '' ) => api.putArmor( this.route, armor )
        .then( async ( response ) => {
            const armor = await this.handleArmor( 'denial', response, type )
            return Promise.reject( armor );
        } )
        .catch( error => this.handleArmor( 'confusion', error, type ) ) 
    removeArmor = async () => api.deleteArmor( this.route )
        .then( async () => {
            const parts = this.seeParts();
            const partKeys = Object.keys( parts );
            const acknowldegement = await this.handleResentment( RESENTMENT_TYPE_ACKNOWLEDGE );
            if ( acknowldegement ) {
                partKeys.map( async part => await api.postVulnerability( this.route, part ) );      
                [ 'silence', 'denial', 'sarcasm', 'confusion' ].map( armorType => this[ armorType ] = { ...EMPTY_SHIELD } );
                const vulnerability = await api.getVulnerability( this.route );
                return Promise.resolve( vulnerability );
            }
        } )
        .catch( error => this.handleResentment( error ) )
}
