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

export default router;
