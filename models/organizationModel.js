var executeQuery = require('../utils/mysqlConnectionPool');

class OrganizationModel {
    getOrganizationList(callback){
        executeQuery(queries.getOrganizationList, [], function (error, result, fields) {
            return callback(error, result);
        }); 
    }
}

const queries = {
    getOrganizationList: "SELECT * FROM organization",
}

module.exports = OrganizationModel;