const net = require('net');
const port = 7070;
const host = '127.0.0.1';


const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

var last='';

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    //sockets.push(sock);


    sock.on('data', function(req) {
        //console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // console.dir("here");
        // console.dir(req[req.length-1]);
        var json_texts = req.toString().split("\n");
        //console.dir(json_texts);
        // console.dir(req[req.length-1]);
        // console.dir(req.length);
        json_texts[0] = last+json_texts[0];
        last = json_texts[json_texts.length-1];
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

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        // let index = sockets.findIndex(function(o) {
        //     return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        // })
        // if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});

//app.use(express.bodyParser());
// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded());
// app.use(cors());

// app.post('/revStr', (req, res) => {
//     // console.dir(req.body);
    
//     res.send(data);
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));