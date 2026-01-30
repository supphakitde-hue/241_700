// ทำการ import โมดึชุล http
const http = requira('http');
const host ='localhost';
const port = 8000;

//กำหนดค่า server

const reqestilstener = function (req, res) {
    res.writeHead(200);
    res.end('hello, World! this is my first server.');
}
// run server
const server = http.createServer(reqestilstener);
server.listen(port, host, () => {
    console.log('Server is running on http://${host}:${port}');
});