/**
 * API router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - `/api/faculty`
 * - `/api/faculty/[id]`
 */

import express from 'express';

import getFaculty from 'models/faculty/operations/get-faculty.js';
import getFacultyDetail from 'models/faculty/operations/get-faculty-detail.js';

const apis = express.Router();

/**
 * Resolve URL `/api/faculty`.
 */

apis.get( '/', async ( req, res ) => {
    try {
        const data = await getFaculty( req.query.languageId );
        if ( data.error )
            res.status( 400 ).json( data );
        res.json( data );
    }
    catch ( error ) {
        res.status( 500 ).json( {
            error: {
                message: 'server error',
            },
        } );
    }
} );

/**
 * Resolve URL `/api/faculty/[id]`.
 */

apis.get( '/:profileId', async ( req, res ) => {
    try {
        const profileId = Number( req.params.profileId );

        /**
         * Invalid profileId.
         * Handle with 400 bad request.
         *
         * @todo use profile util or validator to check `profileId`.
         */

        if ( !Number.isInteger( profileId ) ) {
            res.status( 400 ).json( {
                error: {
                    message: `invalid profileId ${ req.params.profileId }`,
                },
            } );
            return;
        }
        const data = await getFacultyDetail( {
            profileId,
            languageId: req.query.languageId,
        } );
        if ( data.error ) {
            res.status( data.status ).json( data );
            return;
        }
        res.json( data );
    }
    catch ( error ) {
        res.status( 500 ).json( {
            error: {
                message: 'server error',
            },
        } );
    }
} );

export default apis;
