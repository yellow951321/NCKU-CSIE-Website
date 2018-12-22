/**
 * Router module for route `/`.
 *
 * Including following sub-routes:
 * - `/login`
 * - `/login/error`
 * - `/login/forget`
 */

import path from 'path';

import express from 'express';

import { projectRoot, } from 'settings/server/config.js';

const router = express.Router();

/**
 * Resolve URL `/login`.
 */

router.get( /^\/$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/login/index.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/login/error`.
 */

router.get( /^\/error$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/login/error.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/login/forget`.
 */

router.get( /^\/forget$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/login/forget.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/login/account_error`.
 */

router.get( /^\/account_error$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/login/account_error.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/login/verify`.
 */

router.get( /^\/verify$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/login/verify.${ req.query.language }.html` ) );
} );

router.post( /^\/$/, ( req, res ) => {
    const defaultAccount = '123';
    const defaultPassword = '456';
    if ( defaultAccount === req.body.account && defaultPassword === req.body.password )
        res.sendFile( path.join( projectRoot, `/static/dist/html/home/index.${ req.query.language }.html` ) );
    else
        res.sendFile( path.join( projectRoot, `/static/dist/html/login/error.${ req.query.language }.html` ) );
} );

router.post( /^\/error$/, ( req, res ) => {
    const defaultAccount = '123';
    const defaultPassword = '456';
    if ( defaultAccount === req.body.account && defaultPassword === req.body.password )
        res.sendFile( path.join( projectRoot, `/static/dist/html/home/index.${ req.query.language }.html` ) );
    else
        res.sendFile( path.join( projectRoot, `/static/dist/html/login/error.${ req.query.language }.html` ) );
} );

router.post( /^\/forget$/, ( req, res ) => {
    const defaultAccount = '123';
    if ( defaultAccount === req.body.account )
        res.sendFile( path.join( projectRoot, `/static/dist/html/login/verify.${ req.query.language }.html` ) );
    else
        res.sendFile( path.join( projectRoot, `/static/dist/html/login/account_error.${ req.query.language }.html` ) );
} );

export default router;
