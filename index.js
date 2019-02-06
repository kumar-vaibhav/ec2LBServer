const net = require('net');
const port = 7070;
const host = '127.0.0.1';


const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

var last={};

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    // console.log(sock);

    sockPort = sock.remotePort;

    last[sockPort] = '';

    sock.on('data', function(req) {
        var json_texts = req.toString().split("\n");
        json_texts[0] = last[sockPort]+json_texts[0];
        last[sockPort] = json_texts[json_texts.length-1];
        for(d=0;d<json_texts.length-1;d++)
        {
            var str = json_texts[d];
            if(str.length>0)
            {
                var data;
                try {
                    data = JSON.parse(str);
                } catch(e) {
                    console.dir(e);
                    continue;
                }
                // console.log(data.str);
                data.str = [...data.str].reverse().join('');
                sock.write(JSON.stringify(data)+'\n');
            }
        }
        
    });

    sock.on('error', function(error){
        console.dir(error);
    });

    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});