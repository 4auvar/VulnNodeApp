var crypto = require('crypto');

exports.generateHash = function (text) {
    var hash = crypto.createHash('sha512');
    hash.update(text);
    return hash.digest('hex');
}