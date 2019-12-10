const bunyan = require('bunyan');

const date = (() => new Date().toISOString().substring(0,10))();

exports.loggerInstance = bunyan.createLogger({
    name: 'transaction-notifier',
    serializers: {
        req: require('bunyan-express-serializer'),
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err
    },
    level: 'info',
    streams: [
        {
            path: `./logs/${date}.log`
        },
    ]
});

exports.logResponse = function (id, body, statusCode) {
    var log = this.loggerInstance.child({
        id: id,
        body: body,
        statusCode: statusCode
    }, true)
    log.info('response')
}
