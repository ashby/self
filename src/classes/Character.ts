import Self from './Self';
import * as api from 'src/api';
import * as union from 'lodash/union';
import * as EMPTY_ATTRIBUTES from 'src/utils/attributes';

export default class Character extends Self {
    attributes: {}
    ATTRIBUTE: string = undefined
    ATTRIBUTES_NAME: string = undefined
    ATTRIBUTES: Array<string> = []
    API: Array<string> = []
    API_KEY?: string = undefined
    ROUTE: string = undefined
    accessActionThen: Function = () => undefined
    accessActionCatch: Function = () => undefined
    createActionThen: Function = () => undefined
    createActionCatch: Function = () => undefined
    increaseActionThen: Function = () => undefined
    increaseActionCatch: Function = () => undefined
    removeActionThen: Function = () => () => undefined
    removeActionCatch: Function = () => undefined
    public finishCharacterSheet() {
        this.route = this.ROUTE;
        const name = this.ATTRIBUTES_NAME;
        this.attributes = {
            ...this.attributes,
            [ name ]: {}
        };
        const emptyAttribute = EMPTY_ATTRIBUTES[ `EMPTY_${this.ATTRIBUTE.toUpperCase()}` ];
        this.ATTRIBUTES.map( attribute => this.attributes[ name ][ attribute ] = emptyAttribute );
    }
    private apiKey = key => key.charAt( 0 ).toUpperCase() + key.slice( 1 )
    public seeAttributes = ( name ) => {
        let attributes = {};
        const attributeKeys = Object.keys( this.attributes[ name ] );
        attributeKeys.map( attribute => attributes[ attribute ] = { ...this.attributes[ name ][ attribute ] } );
        return attributes;
    }
    public handleAttribute = async ( key, value, resentment = '' ) => {
        await this.handleResentment( resentment, value );
        const name = this.ATTRIBUTES_NAME;
        const apiKey = this.API_KEY;
        const attributes = { ...this.attributes[ name ][ key ][ apiKey ] }; 
        this.attributes[ name ][ key ][ apiKey ] = union( attributes, value );
        return Promise.resolve( this.attributes[ name ][ key ][ apiKey ] );
    }
    public accessAction = ( key ) => api[ `get${this.apiKey( key )}` ]( this.route )
        .then( async response => this.accessActionThen( response ) )
        .catch( async error => this.accessActionCatch( error ) )
    public createAction = ( key, value ) => api[ `post${this.apiKey( key )}` ]( this.route, value )
        .then( async response => this.createActionThen( response ) )
        .catch( async error => this.createActionCatch( error ) )
    public increaseAction = ( key, value, resentment ) => api[ `put${this.apiKey( key )}` ]( this.route, value )
        .then( async response => this.increaseActionThen( response ) )
        .catch( async error => this.increaseActionCatch( error ) )
    public removeAction = ( key ) => api[ `delete${this.apiKey( key )}` ]( this.route )
        .then( async response => this.removeActionThen( response ) )
        .catch( async error => this.removeActionCatch( error ) )
}