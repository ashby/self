import Congrerant from './Congrerant';
import * as api from 'src/api';
import { EMPTY_OATH } from 'src/constants';
import { CODEPENDANCY } from 'src/routes';
import * as union from 'lodash/union';

export default class Paladin extends Congrerant {
    constructor( route ) {
        super();
        this.route = route;
    }
    pledge = { ...EMPTY_OATH }
    campaign = { ...EMPTY_OATH }
    crusade = { ...EMPTY_OATH }
    get paladin() { return this.seeOaths() }
    seeOaths = () => ( { 
        pledge: this.pledge,
        campaign: this.campaign,
        crusade: this.crusade
    } )
    private handleGuard = async ( loyalty ) => this.dismissGuard( loyalty )
        .catch( error => this.removeShame( error ) );
    public buildLoyalty = async ( loyalty ) => {
        //await this.increaseCourage( loyalty );
        await this.handleGuard( loyalty );
        loyalty = await this.createLoyalty( loyalty );
        return Promise.resolve( loyalty );
    }
    handleLoyalty = async ( oath, loyalty ) => {
        this[ oath ].loyalty = union( this[ oath ].loyalty, loyalty );
        return Promise.resolve( this[ oath ].loyalty ); 
    }
    accessLoyalty = async () => api.getLoyalty( this.route )
                        .then( response => this.handleLoyalty( 'pledge', response ) )
    createLoyalty = async loyalty => api.postLoyalty( this.route, loyalty )
                        .then( response => this.handleLoyalty( 'campaign', response ) )
    increaseLoyalty = async loyalty => api.putLoyalty( this.route, loyalty )
                        .then( response => this.handleLoyalty( 'crusade', response ) )
    removeLoyalty = async () => api.deleteLoyalty( this.route )
                        .then( () => {
                            return [ 'pledge', 'campaign', 'crusade' ].map( async oath => { 
                                this[ oath ].loyalty = { ...EMPTY_OATH }.loyalty;
                                await this.createShame( oath );
                                await this.increaseShame( oath ); 
                            } );
                        } )
    accessHonor = async () => api.getHonor( this.route )
                        .then( response => this.handleHonor( 'pledge', response ) )
    createHonor = async loyalty => api.postLoyalty( this.route, loyalty )
                        .then( response => this.handleHonor( 'campaign', response ) )
    increaseHonor = async loyalty => api.putLoyalty( this.route, loyalty )
                        .then( response => this.handleHonor( 'crusade', response ) )
    removeHonor = async () => api.deleteHonor( this.route )
                        .then( () => {
                            return [ 'pledge', 'campaign', 'crusade' ].map( async oath => { 
                                this[ oath ].loyalty = { ...EMPTY_OATH }.loyalty;
                                await this.createShame( oath );
                                await this.increaseShame( oath ); 
                            } );
                        } )               
}