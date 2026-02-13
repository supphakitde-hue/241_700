/** 
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
    console.log(`Server is running on http://${host}:${port}`);
});

*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const port = 8000;

let users =[];
let counter = 1;
/**
 *GET /users /ดึงข้อมูลผู้ใช้ทั้งหมด
 POST /users - เพิ่มผูั้ใช้ใหม่
 GET /users/:id - ดึงข้อมูลผู้ใช้ตาม ID
 PUT / users/:id - แก้ไขข้อมูลผู้ใช้ตาม ID ที่บันทึก
 DELETE /users/:id - ลบผู้ใช้ตาม ID ที่บึนทึก
 */

// path: = GET /users
app.get('/users', (req, res) => {
    res.json(users);
})

// path: = POST /users
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter
    counter += 1;

    users.push(user);
    res.json({
    message: 'User added successfully',
    user : user
    });
});

// path: = PUT /user/:id
app.patch('/user/:id', (req, res) => {
    let id =req.params.id;
    let updateUser = req.body;

    // หา user ที่จาก id ที่ส่งมา
    let selectedIndex = users.findIndex(user => user.id == id );
    
    //อัพเดทข้อมูล users
    users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname;
    users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname;
    
    if (updateUser.firstname ) {
        users[selectedIndex].firstname = updateUser.firstname;
    }
    if (updateUser.lastname) {
        users[selectedIndex].lastname =updateUser.lastname;
    }

    res.json({
        message: 'User updated successfully',
        date: {
            user: updateUser,
            indexUpdated: selectedIndex
        }
    });

    // ส่ง users ที่อัพเดตแล้วกลับไป
})
app.delete('/users/:id', (req, res) => {
    let id = req.params.id;
    // หา index จาก id ที่ต้องการลบ
    let selectedIndex = users.findIndex(user => user.id == id );
    users.splice(selectedIndex,1);


    // ลบ user ออกจาก users
    delete users[selectedIndex];
    res.json({
        message: 'User deleted successfully',
        indexDelete: selectedIndex
    });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});