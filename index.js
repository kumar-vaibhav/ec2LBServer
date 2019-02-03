const express = require('express');
var cors = require('cors')
const app = express();
const port = 3000;

//app.use(express.bodyParser());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
app.use(cors());

app.post('/revStr', (req, res) => {
    // console.dir(req.body);
    var data = req.body;
    data.str = [...data.str].reverse().join('');
    res.send(data);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));