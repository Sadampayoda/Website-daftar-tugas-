const http = require("node:http");
const mongodb = require('./self-modul/mongoDb.js')
const response = require('./self-modul/response.js')


const server = http.createServer(async (req, res) => {
    const db = await mongodb.connectMongoDb();
    const collection1 = db.collection('users');
    const users = await collection1.find({}).toArray();
    if(req.method == 'GET')
    {
        if(req.url == '/')
        {
            response.response(res,'/page/guest/login.html','text/html')
        }else if(req.url == '/register')
        {
            response.response(res,'/page/guest/register.html','text/html')
        }else{
            response.response(res,'/page/index.html','text/html')
        }
    }else if(req.method == 'POST')
    {
        if(req.url == '/')
        {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk
            }) 
            req.on('end', async () => {
                const parsedData = new URLSearchParams(body);
                const name = parsedData.get('name');
                const password = parsedData.get('password');

                const user = await collection1.findOne(
                    {
                        name:name,
                        password:password
                    }
                )
                if (!user) {
                    res.writeHead(401, { 'Content-type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid credentials' }));
                } else {
                    res.writeHead(200, { 'Content-type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Login successful', user: user }));
                }
            })
        }else if(req.url === '/register')
        {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk
            }) 
            req.on('end', async () => {
                const parsedData = new URLSearchParams(body);
                const name = parsedData.get('name');
                const password = parsedData.get('password');
                const konfirmasi = parsedData.get('konfirmasi');

                if(password === konfirmasi)
                {
                    const exists = await collection1.findOne(
                        {
                            name:name,
                        }
                    )
                    if(exists)
                    {
                        const user = await collection1.insertOne({
                            name:name,
                            password:password,
                        })
    
                        if (!user.acknowledged) {
                            res.writeHead(401, { 'Content-type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Invalid credentials' }));
                        } else {
                            res.writeHead(200, { 'Content-type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Register successful', user: user }));
                        }
                    }else{
                        res.writeHead(401, { 'Content-type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Nama sudah ada' }));
                    }
                    
                }else {
                    res.writeHead(401, { 'Content-type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Password dan konfirmasi tidak cocok' }));
                }
            })
        }
    }
}).listen(3000, () => {
    console.log('Server akses port 3000')
});
