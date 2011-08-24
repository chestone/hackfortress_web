var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    url = require('querystring');

var PUZZLE_ANSWER = 'need more sandviches!',
    PUZZLE_TOKEN = 'asdf';

function onRequest(req, resp) {
    console.log('Request received, looking for ' + req.url + ' with method : ' + req.method);
    var filePath = '.' + req.url;
    if (filePath == './') 
        filePath = './index.html';
    if (filePath == './answer' && req.method == 'POST') {
        console.log(req.body);
        var postData = '';
        req.addListener('data', function(chunk) {
            postData += chunk;
        });

        req.addListener('end', function() {
            console.log('Post data recieved : ' + postData);
            var answer = url.parse(postData).answer;
            console.log(answer);
            if (answer == PUZZLE_ANSWER) {
                content = 'Congrats! The answer is: I love Mann!';
            } else {
                content = 'Failed! Use The Source!';
            }

            resp.writeHead(200, {'Content-Type' : 'text/html'});
            resp.end(content, 'utf-8');
        });

    }
    var extname = path.extname(filePath);
    var contentType = 'text/html';

    switch (extname) {
        case '.js' : 
            contentType = 'text/javascript';
            break;
        case '.css' : 
            contentType = 'text/css';
            break;
    }

    path.exists(filePath, function(exists){
        if (exists) {
            fs.readFile(filePath, function(err, content) {
                if (err) throw err;

                resp.writeHead(200, {'Content-Type' : contentType});
                resp.end(content, 'utf-8');
            });
        } else {
            resp.writeHead(404);
            resp.end();
        }
    });
}

http.createServer(onRequest).listen(3001);
console.log('Custom Server has started on port 3001 for MannCo Poll Puzzle');
