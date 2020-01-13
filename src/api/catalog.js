import request from 'request';

function _updateQueryStringParameter (uri, key, value) {
  var re = new RegExp('([?&])' + key + '=.*?(&|#|$)', 'i');
  if (uri.match(re)) {
    if (value) {
      return uri.replace(re, '$1' + key + '=' + value + '$2');
    } else {
      return uri.replace(re, '$1' + '$2');
    }
  } else {
    var hash = '';
    if (uri.indexOf('#') !== -1) {
      hash = uri.replace(/.*#/, '#');
      uri = uri.replace(/#.*/, '');
    }
    var separator = uri.indexOf('?') !== -1 ? '&' : '?';
    return uri + separator + key + '=' + value + hash;
  }
}

/**
 * Elastic proxy implementation to support GET queries format (for better caching)
 * You might use this proxy to adjust the elastic results programmaticaly (eg. implemeting tax calc logic)
 * 
 * Details: https://github.com/DivanteLtd/vue-storefront-integration-sdk/blob/tutorial/Dynamic%20API%20specification.md#vsbridgecatalog
 */
export default ({config, db}) => function (req, res, body) {
  let groupId = null

  // Request method handling: exit if not GET or POST
  // Other metods - like PUT, DELETE etc. should be available only for authorized users or not available at all)
  if (!(req.method === 'GET' || req.method === 'POST' || req.method === 'OPTIONS')) {
    throw new Error('ERROR: ' + req.method + ' request method is not supported.')
  }

  let requestBody = {}
  if (req.method === 'GET') {
    if (req.query.request) { // this is in fact optional
      requestBody = JSON.parse(decodeURIComponent(req.query.request))
      console.log(requestBody)
    }
  } else {
    requestBody = req.body
  }

  const urlSegments = req.url.split('/');

  let indexName = ''
  let entityType = ''
  if (urlSegments.length < 2) { throw new Error('No index name given in the URL. Please do use following URL format: /api/catalog/<index_name>/<entity_type>_search') } else {
    indexName = urlSegments[1];

    if (urlSegments.length > 2) { entityType = urlSegments[2] }

    if (config.elasticsearch.indices.indexOf(indexName) < 0) {
      throw new Error('Invalid / inaccessible index name given in the URL. Please do use following URL format: /api/catalog/<index_name>/_search')
    }

    if (urlSegments[urlSegments.length - 1].indexOf('_search') !== 0) {
      throw new Error('Please do use following URL format: /api/catalog/<index_name>/<entity_name>/_search')
    }
  }

  // pass the request to elasticsearch
  let url = config.elasticsearch.host + ':' + config.elasticsearch.port + (req.query.request ? _updateQueryStringParameter(req.url, 'request', null) : req.url)

  if (!url.startsWith('http')) {
    url = config.elasticsearch.protocol + '://' + url
  }


  let auth = null;

  // Only pass auth if configured
  if (config.elasticsearch.user || config.elasticsearch.password) {
    auth = {
      user: config.elasticsearch.user,
      pass: config.elasticsearch.password
    };
  }
  const s = Date.now()
    request({ // do the elasticsearch request
      uri: url,
      method: req.method,
      body: requestBody,
      json: true,
      auth: auth
    }, (_err, _res, _resBody) => { // TODO: add caching layer to speed up SSR? How to invalidate products (checksum on the response BEFORE processing it)
      res.json(_resBody);
    });
}
