import * as api from 'src/api';
import { EMPTY_ACT } from 'src/constants';
import * as union from 'lodash/union';
import Summoner from './Summoner';
import * as isEqual from 'lodash/isEqual';

export default class Volunteer extends Summoner {
    service = { ...EMPTY_ACT }
    sacrifice = { ...EMPTY_ACT }
    support = { ...EMPTY_ACT }
    get volunteer() { return this.seeActs() }
    seeActs = () => ( { 
        service: this.service,
        sacrifice: this.sacrifice,
        support: this.support
    } )
    private handleCourage = ( act, courage ) => {
        this[ act ].courage = union( this[ act ].courage, courage );
        return Promise.resolve( this[ act ].courage ); 
    }
    private handleCompassion = ( act, compassion ) => {
        this[ act ].compassion = union( this[ act ].compassion, compassion );
        return Promise.resolve( this[ act ].compassion ); 
    }
    private handleKnight = async ( oath ) => {
        const Knight = global.Knight;
        const hasKnight = !!Knight && isEqual( Knight.pledge.loyalty, oath );
        if( hasKnight ) {
            return this.dismissKnight();
        } else {
            return false;
        }
    }
    accessCourage = async () => api.getCourage( this.route )
                        .then( response => this.handleCourage( 'support', response ) )
    createCourage = async courage => api.postCourage( this.route, courage )
                        .then( response => this.handleCourage( 'service', response )  )
    increaseCourage = async courage => api.putCourage( this.route, courage )
                        .then( response => this.handleCourage( 'sacrifice', response )  )
    removeCourage = async () => api.deleteCourage( this.route )
                        .then( () => 
                            [ 'support', 'service', 'sacrifice' ].map( part => this[ part ].courage = { ...EMPTY_ACT }.courage ) 
                        )
                        .catch( async error => {
                            await this.summonKnight( error );
                            return new Error( error );
                        } )  
    accessCompassion = async () => api.getCompassion( this.route )
                        .then( async response => {
                            await this.handleKnight( response );
                            const compassion = await this.handleCompassion( 'support', response );
                            return compassion; 
                        } )
    createCompassion = async compassion => api.postCompassion( this.route, compassion )
                        .then( async response => {
                            await this.handleKnight( response );
                            const compassion = await this.handleCompassion( 'service', response );
                            return compassion; 
                        } )
    increaseCompassion = async compassion => api.putCompassion( this.route, compassion )
                        .then( async response => {
                            await this.handleKnight( response );
                            const compassion = await this.handleCompassion( 'sacrifice', response );
                            return compassion; 
                        }  )
    removeCompassion = async () => api.deleteCompassion( this.route )
                        .then( () => 
                            [ 'support', 'service', 'sacrifice' ].map( part => this[ part ].compassion = { ...EMPTY_ACT }.compassion ) 
                        )
                        .catch( async error => {
                            await this.summonKnight( error );
                            return new Error( error );
                        } )               
}