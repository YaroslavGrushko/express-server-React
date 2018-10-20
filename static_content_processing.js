// module for processing requests/response to(from) static content {located on the server}  with correct meta-data.
// means that this module takes request, response from app.js and returns response with static content
const customers = [
    { id: 1, firstName: 'Yaroslav', lastName: 'Grushko' },
    { id: 2, firstName: 'Denis', lastName: 'Garkavenko' },
    { id: 3, firstName: 'Vasiliy', lastName: 'Pupko' },
];

function StaticContent(current_request, current_response) {

    this.request = current_request;
    this.response = current_response;
    //get headers of request:
    var host = this.request.headers['host'];
    // request headers validation
    // host must be defined and defined as 'localhost:5000'
    if (host && host == 'localhost:5000') console.log('++ host from request headers is validated successfully, host: ' + host);
    // let's imagine that we need Chroom browser,
    //so user agent must be defined and be Chroom browser
    var userAgent = this.request.headers['user-agent'];
    if (userAgent && userAgent.includes('Chrome')) console.log('++ user agent from request headers is validated successfully, user agent: ' + userAgent);


    var staticContent = " ";
    this.getStaticContent = function(type) {
        //return html content
        // staticContent = customers;
        // send response
        if (type == 'places') {
            //get PLACES from Db/getPlaces module
            var PLACESmod = require("./Db/getPlaces");
            PLACESmod(function(PLACES) {
                // here code using PLACES:
                // let's return PLACES
                current_response.json(PLACES);
            })

        } else {
            // let's return customers
            if (type == 'customers') {
                var a = 1;
                current_response.json(customers);
            }
        }
    }


}

module.exports = StaticContent;