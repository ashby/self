import Self from './Self';
import * as api from 'src/api';
import { EMPTY_VIRTUE } from 'src/constants';

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
        this[ virtue ].vulnerability = this[ virtue ].vulnerability.concat( vulnerability ); 
        return Promise.resolve( this[ virtue ].vulnerability ); 
    }
    private handleBoundary = async ( error ) => {
        const angerPromise = this.createAnger( error );
        const selfPityPromise = this.createSelfPity( error );
        const [ anger, selfPity ] = await Promise.all( [ angerPromise, selfPityPromise ] );
        return Promise.resolve( { anger, selfPity } );
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
                        .catch( async error => this.handleBoundary( error ) )                          
}