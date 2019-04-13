import Self from './Self';
import Guardian from './Guardian';
import * as api from 'src/api';
import { EMPTY_VIRTUE } from 'src/constants';
import * as union from 'lodash/union';

export default class Seeker extends Self {
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
    private createGuard = error => {
        const Guard = new Guardian();
        return Guard.buildBoundary( error );
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
                        .catch( async error => this.createGuard( error ) )                          
}