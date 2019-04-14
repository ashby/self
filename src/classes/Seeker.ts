import * as api from 'src/api';
import { EMPTY_VIRTUE } from 'src/constants';
import * as union from 'lodash/union';
import Summoner from './Summoner';

export default class Seeker extends Summoner {
    soul = { ...EMPTY_VIRTUE }
    love = { ...EMPTY_VIRTUE }
    mind = { ...EMPTY_VIRTUE }
    get seeker() { return this.seeVirtues() }
    seeVirtues = () => ( { 
        soul: this.soul,
        love: this.love,
        mind: this.mind
    } )
    private handleVulnerability = ( virtue, vulnerability ) => {
        this[ virtue ].vulnerability = union( this[ virtue ].vulnerability, vulnerability );
        return Promise.resolve( this[ virtue ].vulnerability ); 
    }
    private handleAcceptance = ( virtue, acceptance ) => {
        this[ virtue ].acceptance = union( this[ virtue ].acceptance, acceptance );
        return Promise.resolve( this[ virtue ].acceptance ); 
    }
    getVulnerability = async () => api.getVulnerability( this.route )
                        .then( response => this.handleVulnerability( 'mind', response ) )
    createVulnerability = async vulnerability => api.postVulnerability( this.route, vulnerability )
                        .then( response => this.handleVulnerability( 'soul', response )  )
    updateVulnerability = async vulnerability => api.putVulnerability( this.route, vulnerability )
                        .then( response => this.handleVulnerability( 'love', response )  )
    removeVulnerability = async () => api.deleteVulnerability( this.route )
                        .then( () => 
                            [ 'mind', 'soul', 'love' ].map( part => this[ part ].vulnerability = { ...EMPTY_VIRTUE }.vulnerability ) 
                        )
                        .catch( async error => {
                            await this.summonGuard( error );
                            return new Error( error );
                        } )  
    getAcceptance = async () => api.getAcceptance( this.route )
                        .then( response => this.handleAcceptance( 'mind', response ) )
    createAcceptance = async acceptance => api.postAcceptance( this.route, acceptance )
                        .then( response => this.handleAcceptance( 'soul', response )  )
    updateAcceptance = async acceptance => api.putAcceptance( this.route, acceptance )
                        .then( response => this.handleAcceptance( 'love', response )  )
    removeAcceptance = async () => api.deleteAcceptance( this.route )
                        .then( () => 
                            [ 'mind', 'soul', 'love' ].map( part => this[ part ].acceptance = { ...EMPTY_VIRTUE }.acceptance ) 
                        )
                        .catch( async error => {
                            await this.summonGuard( error );
                            return new Error( error );
                        } )               
}