import express from 'express';

import getAllAnnouncements from 'models/announcement/operations/get-all-announcements.js';
import getAllPages from 'models/announcement/operations/get-all-pages.js';
import getAnnouncement from 'models/announcement/operations/get-announcement.js';
import getAllPinnedAnnouncements from 'models/announcement/operations/get-all-pinned-announcements.js';
import getAnnouncementsByTags from 'models/announcement/operations/get-announcements-by-tags.js';

// Import getPinnedAnnouncementsByTags from 'models/announcement/operations/get-pinned-announcements-by-tags.js';
// import getPagesByTags from 'models/announcement/operations/get-pages-by-tags.js';
// import getAnnouncementAllLanguages from 'models/announcement/operations/get-announcement-all-languages.js';

// import postAnnouncement from 'models/announcement/operations/post-announcement.js';
// import postAnnouncementTags from 'models/announcement/operations/post-announcementTags.js';
// import postAnnouncementFile from 'models/announcement/operations/post-announcementFile.js';

// import patchAnnouncement from 'models/announcement/operations/patch-announcement.js';

// import deleteAnnouncement from 'models/announcement/operations/delete-announcements.js';
// import deleteAnnouncementTags from 'models/announcement/operations/delete-announcementTags.js';
// import deleteAnnouncementFiles from 'models/announcement/operations/delete-announcementFiles.js';

const apis = express.Router();

apis.get( '/all-announcement', async ( req, res ) => {
    const tags = req.query.tags || [];
    res.json( await getAllAnnouncements( {
        languageId: req.query.languageId,
        amount:     req.query.amount,
        tags:       [ ...tags, ],
        from:       req.query.from,
        to:         req.query.to,
        page:       req.query.page,
    } ) );
} );

apis.get( '/all-pages', async ( req, res ) => {
    const tags = req.query.tags || [];
    res.json( await getAllPages( {
        amount: req.query.amount,
        tags:   [ ...tags, ],
        from:   req.query.from,
        to:     req.query.to,
    } ) );
} );

apis.get( /^\/(\d+)$/, async ( req, res ) => {
    res.json( await getAnnouncement( {
        announcementId: req.params[ 0 ],
        languageId:     req.query.languageId,
    } ) );
} );

apis.get( '/all-pinned', async ( req, res ) => {
    const tags = req.query.tags || [];
    res.json( await getAllPinnedAnnouncements( {
        tags:       [ ...tags, ],
        from:       req.query.from,
        to:         req.query.to,
        languageId:  req.query.languageId,
    } ) );
} );

apis.get( '/tags-announcement', async ( req, res ) => {
    const tags = req.query.tags || [];
    res.json( await getAnnouncementsByTags( {
        languageId: req.query.languageId,
        amount:     req.query.amount,
        tags:       [ ...tags, ],
        from:       req.query.from,
        to:         req.query.to,
        page:       req.query.page,
    } ) );
} );

// Apis.get( /^\/tags-announcement$/, async ( req, res ) => {
//     let tags = req.query.tags;
//     if ( typeof tags === 'string' )
//         tags = Array.of( tags );

//     const result = await getAnnouncementsByTags( {
//         tags,
//         startTime: req.query.startTime,
//         endTime:   req.query.endTime,
//         page:      req.query.page,
//         language:  req.query.languageId,
//     } );

//     if ( result.error )
//         res.status( 400 ).json( result );
//     else if ( !result.length )
//         res.status( 404 ).end();
//     else
//         res.status( 200 ).json( result );
// } );

// apis.get( /^\/tags-pages$/, async ( req, res ) => {
//     let tags = req.query.tags;
//     if ( typeof tags === 'string' )
//         tags = Array.of( tags );

//     const result = await getPagesByTags( {
//         tags,
//         startTime: req.query.startTime,
//         endTime:   req.query.endTime,
//     } );

//     if ( result.error )
//         res.status( 400 ).json( result );
//     else if ( !result.pageNumber )
//         res.status( 404 ).end();
//     else
//         res.status( 200 ).json( result );
// } );

// apis.get( /^\/tags-pinned$/, async ( req, res ) => {
//     let tags = req.query.tags;
//     if ( typeof tags === 'string' )
//         tags = Array.of( tags );

//     const result = await getPinnedAnnouncementsByTags( {
//         tags,
//         startTime: req.query.startTime,
//         endTime:   req.query.endTime,
//         language:  req.query.languageId,
//     } );

//     if ( result.error )
//         res.status( 400 ).json( result );
//     else if ( !result.length )
//         res.status( 404 ).end();
//     else
//         res.status( 200 ).json( result );
// } );

// apis.get( /^\/all-languages\/(\d+)$/, async ( req, res ) => {
//     try {
//         res.json( await getAnnouncementAllLanguages( { announcementId: req.params[ 0 ], } ) );
//     }
//     catch ( e ) {
//         res.status( 404 ).end();
//     }
// } );

// apis.post( '/', async ( req, res ) => {
//     try {
//         res.json( await postAnnouncement( { announcementData: req.body, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

// apis.patch( '/:id', async ( req, res ) => {
//     try {
//         res.json( await patchAnnouncement( { announcementId: req.params.id, announcementData: req.body, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

// apis.delete( '/:id', async ( req, res ) => {
//     try {
//         res.json( await deleteAnnouncement( { announcementId: req.params.id, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

// /**
//  * @todo Not yet finished
//  */

// apis.post( '/:id/file', async ( req, res ) => {
//     try {
//         res.json( await postAnnouncementFile( { announcementFileData: req.body, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

// // TODO: Not yet finished
// apis.delete( '/:id/file/:id', async ( req, res ) => {
//     try {
//         res.json( await deleteAnnouncementFiles( { announcementFileData: req.body, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

// apis.post( '/:id/tags', async ( req, res ) => {
//     try {
//         res.json( await postAnnouncementTags( { announcementId: req.params.id, tagId: req.body, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

// apis.delete( '/:id/tags', async ( req, res ) => {
//     const tagId = req.query.tagId.split( ',' ).map( s => Number.parseInt( s, 10 ) );
//     try {
//         res.json( await deleteAnnouncementTags( { announcementId: req.params.id, tagId, } ) );
//     }
//     catch ( e ) {
//         res.status( 500 ).end();
//     }
// } );

export default apis;
