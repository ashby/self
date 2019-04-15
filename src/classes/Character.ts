import Self from './Self';
import * as api from 'src/api';
import * as union from 'lodash/union';

export default class Character extends Self {
    ATTRIBUTE: string = undefined
    ATTRIBUTES: Array<string> = []
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

    constructor() {
        super()
        this.sheet();
    }
    private sheet() {
        this.route = this.ROUTE;
        this.ATTRIBUTES.map( attribute => this[ attribute ] = this[ `EMPTY_${this.ATTRIBUTE}` ] );
    }
    private apiKey = ( key ) => key.charAt( 0 ).toUpperCase() + key.slice( 1 )
    public seeAttributes = () => {
        const attributes = {};
        this.ATTRIBUTES.map( attribute => this[ attribute ] = attribute );
        return attributes;
    }
    public handleAttribute = async ( key, value, resentment = '' ) => {
        await this.handleResentment( resentment, value );
        const attribute = this.ATTRIBUTE;
        this[ attribute ][ key ] = union( this[ attribute ][ key ], value );
        return Promise.resolve( this[ attribute ][ key ] );
    }
    public accessAction = ( key ) => api[ `get${this.apiKey( key )}` ]( this.route )
        .then( async response => this.accessActionThen( response ) )
        .catch( async error => this.accessActionCatch( error ) )
    public createAction = ( key, value ) => api[ `post${this.apiKey( key )}` ]( this.route, value )
        .then( async response => this.createActionThen( response ) )
        .catch( async error => this.createActionCatch( error ) )
    public increaseAction = ( key, value ) => api[ `put${this.apiKey( key )}` ]( this.route, value )
        .then( async response => this.increaseActionThen( response ) )
        .catch( async error => this.increaseActionCatch( error ) )
    public removeAction = ( key ) => api[ `get${this.apiKey( key )}` ]( this.route )
        .then( async response => this.removeActionThen( response ) )
        .catch( async error => this.removeActionCatch( error ) )
}