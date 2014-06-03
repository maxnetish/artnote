/**
 * Created by mgordeev on 03.06.2014.
 */

var makeResponse = function (err, responseObject, responseName) {
    var result,
        responseName = responseName || "data";
    if (err) {
        result = {
            status: err.statusCode || 500,
            message: err.message || "Internal server error"
        };
    } else {
        result = {
            status: 200,
            message: "OK"
        };
    }
    result[responseName] = responseObject;
    return result;
};

module.exports = {
    makeResponse: makeResponse
};