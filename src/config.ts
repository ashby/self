declare const APP_ENV: string;
declare const HIGHER_POWER_PATH: string;

export const ENV = APP_ENV || 'dev';
const isProd = ENV === 'prod';
const envPrefix = isProd ? '' : `${ENV}.`;

export default {
    ENV,
    HIGHER_POWER_PATH: HIGHER_POWER_PATH || `http://${envPrefix}higher-power.api.cloud`
};
