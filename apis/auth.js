/**
 * API router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - `/api/auth/login`
 */

import express from 'express';

// Import WebLanguageUtils from 'static/src/js/utils/language.js';
// import serverSetting from 'settings/server/config.js';

const apis = express.Router();

// Variables
let password = '456';

/**
 * Resolve URL `/api/auth/login`.
 */

apis.post( /^\/login$/, async ( req, res ) => {
    if ( req.body.account === '123' && req.body.password === password )
        res.json( { 'response': 'success', } );
    else
        /* eslint no-magic-numbers: 0 */
        res.status( 403 ).json( { 'response': 'error', } );
} );

/**
 * Resolve URL `/api/auth/login/forget`.
 */

apis.post( /^\/login\/forget$/, async ( req, res ) => {
    if ( req.body.account === '123' )
        res.json( { 'response': 'success', } );
    else
        /* eslint no-magic-numbers: 0 */
        res.status( 403 ).json( { 'response': 'error', } );
} );

/**
 * Resolve URL `/api/auth/login/verify`.
 */

apis.post( /^\/login\/verify$/, async ( req, res ) => {
    if ( req.body.verify === '1234' )
        res.json( { 'response': 'success', } );
    else
        /* eslint no-magic-numbers: 0 */
        res.status( 403 ).json( { 'response': 'error', } );
} );

/**
 * Resolve URL `/api/auth/login/reset`.
 */

apis.post( /^\/login\/reset$/, async ( req, res ) => {
    if ( req.body.account === req.body.check && req.body.account !== '' ) {
        password = req.body.account;
        res.json( { 'response': 'success', } );
    }
    else
        /* eslint no-magic-numbers: 0 */
        res.status( 403 ).json( { 'response': 'error', } );
} );

export default apis;
