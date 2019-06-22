var sys = require('sys');
var fs = require('fs');

var sys = require('sys');
var fs = require('fs');

class SSE {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  checkHeaders() {
    if (req.headers.accept && req.headers.accept == 'text/event-stream') {
      if (req.url == '/events') {
        sendSSE(req, res);
      } else {
        res.writeHead(404);
        res.end();
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(fs.readFileSync(__dirname + '/sse-node.html'));
      res.end();
    }
  }

  sendSSE(_req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    var id = (new Date()).toLocaleTimeString();

    setInterval(function() {
      constructSSE(res, id, (new Date()).toLocaleTimeString());
    }, 5000);

    constructSSE(res, id, (new Date()).toLocaleTimeString());
    //res.end();
  }

  constructSSE(res, id, data) {
    res.write('id: ' + id + '\n');
    res.write("data: " + data + '\n\n');
  }

  debugHeaders(req) {
    sys.puts('URL: ' + req.url);
    for (var key in req.headers) {
      sys.puts(key + ': ' + req.headers[key]);
    }
    sys.puts('\n\n');
  }
}

module.exports = new SSE();
