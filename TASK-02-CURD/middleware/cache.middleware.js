const nodeCache = require("node-cache");

const cache = new nodeCache();

module.exports = timeout => (req, res, next) => {

    if (req.method != 'GET') {
        console.error("Can not cache non-GET method!");
        return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        console.log(`Cache hit for ${key}`);
        res.send(cachedResponse);
    }
    else {
       console.log(`Cache miss for ${key}`);
       res.originalSend = res.send;
       res.send = body => {
           res.originalSend(body);
           cache.set(key, body, timeout);
       };
       next();
    }

};
