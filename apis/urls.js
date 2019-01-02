/**
 * API router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - announcement: `/api/announcement`
 * - faculty:      `/api/faculty`
 */

import express from 'express';

import announcement from 'apis/announcement.js';
import faculty from 'apis/faculty.js';
import auth from 'apis/auth.js';

const apis = express.Router();

/**
 * Resolve URL `/api/announcement`.
 */

apis.use( '/announcement', announcement );

/**
 * Resolve URL `/api/faculty`.
 */

apis.use( '/faculty', faculty );

/**
 * Resolve URL `/api/auth`.
 */

apis.use( '/auth', auth );

export default apis;
