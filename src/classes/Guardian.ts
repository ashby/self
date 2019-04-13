import Smith from './Smith';
import * as api from 'src/api';
import { EMPTY_CONSTRUCT } from 'src/constants';

export default class Guardian extends Smith {
    gate = { ...EMPTY_CONSTRUCT }
    wall = { ...EMPTY_CONSTRUCT }
    tower = { ...EMPTY_CONSTRUCT }
    get guardian() { return this.seeConstructs() }
    seeConstructs = () => ( { 
        gate: this.gate,
        wall: this.wall,
        tower: this.tower
    } )
    public buildBoundary = async ( boundary ) => {
        const armor = await this.createArmor( boundary );
        return Promise.resolve( armor );
    }
    handleBoundary = ( construct, boundary ) => {
        this[ construct ].boundary = this[ construct ].boundary.concat( boundary ); 
        return Promise.resolve( this[ construct ].boundary ); 
    }
    getBoundary = async () => api.getBoundary( this.route )
                        .then( response => this.handleBoundary( 'gate', response ) )
    createBoundary = async boundary => api.postBoundary( this.route, boundary )
                        .then( response => this.handleBoundary( 'wall', response )  )
    updateBoundary = async boundary => api.putBoundary( this.route, boundary )
                        .then( response => this.handleBoundary( 'tower', response )  )
    removeBoundary = async () => api.deleteBoundary( this.route )
                        .then( () => 
                            [ 'gate', 'wall', 'tower' ].map( construct => this[ construct ].boundary = { ...EMPTY_CONSTRUCT }.boundary ) 
                        )                      
}