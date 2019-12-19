var OrganizationModel = require("../models/organizationModel");

class OrganizationController {
    constructor() {
        this.organizationModel = new OrganizationModel();
    }
    getOrganizationList(callback){
        this.organizationModel.getOrganizationList(function(err,result){
            return callback(err,result);
        });
    };
}

module.exports = OrganizationController;