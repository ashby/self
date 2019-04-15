import * as get from 'lodash/get';

export const getShields = anonymous => get( anonymous, 'attributes.shields' );