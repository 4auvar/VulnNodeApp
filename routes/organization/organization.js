const OrganizationController = require('../../controllers/organizationController');

const fileName = 'FileName: routes/organization/organization.js'

module.exports = {
    renderOrganization: function(req,res,next){
        new OrganizationController().getOrganizationList(function(err,data){
            if(err){
                console.log(fileName + ' | Error:' + JSON.stringify(err));
                return res.render('../views/view-organization', { message: 'Something went wrong', organizationList : null });
            } else {
                return res.render('../views/view-organization', { organizationList : data });
            }
        });
    }
}

