/**
 * Router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - home:         `/`
 * - about:        `/about`
 * - announcement: `/announcement`
 * - login:        `/login`
 * - research:     `/research`
 * - resource:     `/resource`
 * - student:      `/student`
 * - user:         `/user`
 */

import path from 'path';

import express from 'express';

import about from 'routes/about.js';
import announcement from 'routes/announcement.js';
import auth from 'routes/auth.js';
import home from 'routes/home.js';
import language from 'routes/utils/language.js';
import research from 'routes/research.js';
import resource from 'routes/resource.js';
import staticFile from 'routes/static.js';
import staticHtml from 'routes/utils/static-html.js';
import student from 'routes/student.js';
import user from 'routes/user.js';

import { host, staticHost, projectRoot, } from 'settings/server/config.js';
import LanguageUtils from 'models/common/utils/language.js';
import UrlUtils from 'static/src/js/utils/url.js';

const app = express();

/**
 * Set HTML template engine.
 */

app.locals.basedir = path.join( projectRoot, '/static/src/pug' );
app.set( 'view engine', 'pug' );
app.set( 'views', path.join( projectRoot, '/static/src/pug' ) );

/**
 * Url-encoded parser for HTTP request body.
 * Request header `Content-Type` can only be one of the supported types.
 * Mainly used by `<form method='POST' enctype='x-www-form-urlencoded'>`.
 */

app.use( express.urlencoded( {
    extended: true,
    limit:    '5GB',
    type:     [
        'application/x-www-form-urlencoded',
        'multipart/form-data',
        'text/*',
        '*/json',
        'application/xhtml+xml',
        'application/xml',
    ],
} ) );

/**
 * JSON parser for HTTP request body.
 * Request header `Content-Type` can only be JSON related MIME types.
 * Maximum supported JSON size is 5GB.
 */

app.use( express.json( {
    limit: '5GB',
    type:  '*/json',
} ) );

/**
 * Setup language option.
 */

app.use( language );

/**
 * Setup static files routes.
 */

app.use( '/static', staticFile );

app.use( ( req, res, next ) => {
    res.locals.SERVER = {
        host,
        staticHost,
    };
    res.locals.LANG = {
        id:            req.query.languageId,
        getLanguageId: LanguageUtils.getLanguageId,
    };
    res.locals.UTILS = {
        url:       UrlUtils.serverUrl( new UrlUtils( host, req.query.languageId ) ),
        staticUrl: UrlUtils.serverUrl( new UrlUtils( staticHost, req.query.languageId ) ),
    };
    next();
} );

/**
 * Resolve URL `/`.
 */

app.use( '/', home );

/**
 * Resolve URL `/about`.
 */

app.use( '/about', about );

/**
 * Resolve URL `/announcement`.
 */

app.use( '/announcement', announcement );

/**
 * Resolve URL `/auth`.
 */

app.use( '/auth', auth );

/**
 * Resolve URL `/research`.
 */

app.use( '/research', research );

/**
 * Resolve URL `/resource`.
 */

app.use( '/resource', resource );

/**
 * Resolve URL `/student`.
 */

app.use( '/student', student );

/**
 * Resolve URL `/user`.
 */

app.use( '/user', user );


app.use(
    ( {}, res, next ) => {
        res.status( 404 );
        next();
    },
    staticHtml( 'error/404' )
);

app.use( ( err, {}, res, {} ) => {
    res.sendStatus( 500 );
} );

export default app;
