'use strict';
/**
 * Module dependencies.
 */
var files = require('../../app/controllers/files.server.controller');
module.exports = function (app) {
    // CREATE
    app.post('/images', files.create);
    app.post('/images/upload', files.upload);

    // RETRIEVE
    app.get('/images', files.list);
    app.get('/images/:_id', files.detail);

    // UPDATE
    app.put('/images/:_id', files.update);

    // DELETE
    app.delete('/images/:_id', files.delete);
};