global[ 'APP_ENV' ] = '';
global[ 'HIGHER_POWER_PATH' ] = '';

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason || reason)
} )