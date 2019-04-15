import Smith from './Smith';
import * as api from 'src/api';
import { EMPTY_CONSTRUCT } from 'src/constants';
import * as union from 'lodash/union';

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
        await this.increaseArmor( boundary );
        boundary = await this.createBoundary( boundary );
        return Promise.resolve( boundary );
    }
    handleBoundary = async ( construct, boundary ) => {
        this[ construct ].boundary = union( this[ construct ].boundary, boundary );
        return Promise.resolve( this[ construct ].boundary ); 
    }
    accessBoundary = async () => api.getBoundary( this.route )
                        .then( response => this.handleBoundary( 'tower', response ) )
    createBoundary = async boundary => api.postBoundary( this.route, boundary )
                        .then( response => this.handleBoundary( 'gate', response ) )
    increaseBoundary = async boundary => api.putBoundary( this.route, boundary )
                        .then( response => this.handleBoundary( 'wall', response ) )
    removeBoundary = async () => api.deleteBoundary( this.route )
                        .then( () => {
                            const shields = [ 'gate', 'wall', 'tower' ]
                                .map( construct => this[ construct ].boundary = { ...EMPTY_CONSTRUCT }.boundary );
                            Promise.resolve( shields ); 
                        } )
                        .then( () => this.removeArmor() )                  
}