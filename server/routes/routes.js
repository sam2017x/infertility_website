'use strict'

module.exports = function (app) {
    const controller = require('./controllers/restController').locations;

    app.route('/')
        .get(controller.index)

    /**
    * @api {post} api/probabilities/ Request calculated probabilities
    * @apiName postProbabilities
    * @apiGroup Documents
    *
    * @apiParam (Request body) {Array} Stimulation data required to calculate probablities
    * @apiParam (Request body) {Number} Diagnosis numerical representation of infertility diagnosis
    *
    * @apiSuccess {Array} Calculated probabilities.
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *     {
    *       [[0.456, 0.621], [0.456, 0.621, 0.715, 0.832, 0.834 ], [0.456, 0.621, 0.715, 0.832, 0.834 ], [0.456, 0.521]]
    *     }
    */
    app.route('/api/probabilities')
        .post(controller.documents.get_probabilities)

    /**
    * @api {post} api/documents/ Add a document to the database
    * @apiName postDocument
    * @apiGroup Documents
    * 
    * @apiParam (Request body) {Object} Document {stimulationId, country, age, dose, oocytes, cleaving, top, stimulation, probability, cumulativeProbability, status, diagnosis, createdAt}
    * 
    * @apiSuccessExample
    * 
    * HTTP/1.1 200 OK
    *     {
    *       'data added.'
    *     }
    */
    app.route('/api/documents')
        .post(controller.documents.add_document)

    /**
     * @api {post} /api/documents/all Get documents from the database
     * @apiName getDocuments
     * @apiGroup Documents
     * 
     * @apiPermission Authenticated user
     * 
     * @apiParam (Request body) {String} filter mongodb find parameters to filter results
     * @apiParam (Request body) {Number} limit limit returned results
     * @apiParam (Request body) {Number} page skip condition for results
     * @apiParam (Request body) {String} sort mongodb sorting parameters
     * 
     * @apiSuccess {Object} Object with requested documents and search terms
     * 
     * @apiSuccessExample
     * 
     * HTTP/1.1 200 OK
     *     {
     *        rows: documents[],
     *        limit: limit,
     *        sort: sort,
     *        page: page,
     *        count: count 
     *     }
     */
    app.route('/api/documents/all')
        .post(controller.documents.get_documents)

    /**
     * @api {post} /api/documents/:id get a single document from the database
     * @apiName getDocument
     * @apiGroup Documents
     * 
     * @apiPermission Authenticated user
     * 
     * @apiParam {String} Id document id to retrieve from database
     * 
     * @apiSuccess {Object} MongoDB document
     * 
     * @api {delete} /api/documents/:id
     * @apiName deleteDocument
     * @apiGroup Documents
     * 
     * @apiParam {String} Id document id to delete
     */
    app.route('/api/documents/:id')
        .post(controller.documents.get_document)
        .delete(controller.documents.delete_document)

    /**
     * @api {post} /api/admin/login
     * @apiName login
     * @apiGroup Auth
     * 
     * 
     * @apiParam (Request body) User username and password
     * @apiSuccess {Object} JWT bearer token
     */
    app.route('/api/admin/login')
        .post(controller.auth.login)


    /**
     * @api {post} /api/users List users of the site
     * @apiName listUsers
     * @apiGroup Users
     * 
     * @apiPermission Authenticated admin level user
     * 
     * @apiSuccess {Array} Array of users
     */
    app.route('/api/users')
        .post(controller.users.list_users)

    /**
     * @api {post} /api/users/add Add a user
     * @apiName addUser
     * @apiGroup Users
     * 
     * @apiPermission Authenticated admin level users
     * 
     * @apiSuccess 200 'user added'
     */
    app.route('/api/users/add')
        .post(controller.users.add_user)

    /**
     * @api {delete} /api/users/:id Delete a user
     * @apiName deleteUser
     * @apiGroup Users
     * 
     * @apiPermission Authenticated admin level users
     * 
     * @apiSuccess 200 'user deleted'
     */
    app.route('/api/users/:id')
        .delete(controller.users.delete_user)

    /**
     * @api {post} /api/users/password Change password
     * @apiName updatePassword
     * @apiGroup Auth
     * 
     * @apiPermission Authenticated user
     * 
     * @apiSuccess 200 'password changed.'
     */
    app.route('/api/users/password')
        .post(controller.auth.update_password)

    /**
     * @api {post} /api/feedback Get feedback
     * @apiName listFeedback
     * @apiGroup Feedback
     * 
     * @apiPermission Authenticated user
     * 
     * @apiSuccess {Array} Array of feedback objects
     */
    app.route('/api/feedback')
        .post(controller.feedback.list_feedback)

    /**
     * @api {delete} /api/feedback/:id  Delete a single feedback
     * @apiName deleteFeedback
     * @apiGroup Feedback
     * 
     * @apiPermission Authenticated admin level user
     * 
     * @apiSuccess 200 
     */
    app.route('/api/feedback/:id')
        .delete(controller.feedback.delete_feedback)

    /**
     * @api {post} /api/feedback/add Add feedback
     * @apiName addFeedback
     * @apiGroup Feedback
     * 
     * @apiSuccess 200 Feedback added.
     */
    app.route('/api/feedback/add')
        .post(controller.feedback.add_feedback)
}
