let ecomConfig = {};

ecomConfig.port = 3000;
ecomConfig.allowedCorsOrigin = '*';
ecomConfig.env = 'dev';
ecomConfig.db = {
    uri : 'mongodb://127.0.0.1:27017/ecomAppDB',
}
ecomConfig.apiVersion = '/api/v1';

module.exports = {
    port : ecomConfig.port,
    allowedCorsOrigin : ecomConfig.allowedCorsOrigin,
    environment : ecomConfig.env,
    db : ecomConfig.db,
    apiVersion : ecomConfig.apiVersion

}