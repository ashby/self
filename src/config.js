export const ENV = 'dev'
const SET_ENV = ENV !== 'prod' && `${ENV}.` || '';
export const HIGHER_POWER_PATH = `http://${SET_ENV}higher-power.api.cloud`;