const OAuthServer = require('express-oauth-server');
module.export = (app) => {
    
    app.oauth = new OAuthServer({
        model: require('./model'), // See https://github.com/oauthjs/node-oauth2-server for specification
    });

    app.use(app.oauth.authorize());
}