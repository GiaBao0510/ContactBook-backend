const express = require('express');     //Thêm thư viện express
const cors = require('cors');           // Thêm thư viện cors, cho phép các ứng dụng web từ các nguồn khác nhau có thể truy cập vào API của chúng ta.

const app = express();  //Tạo một instance của ứng dụng Express và lưu trữ trong biến app

/*
     Sử dụng middleware CORS để cho phép các request từ các 
    nguồn khác nhau. Điều này rất quan trọng khi phát triển các API có thể 
    được sử dụng bởi nhiều ứng dụng web khác nhau.
*/
app.use(cors());

/*
     Sử dụng middleware express.json() để phân tích cú pháp các request dưới dạng 
    JSON và chuyển đổi chúng thành các đối tượng JavaScript. Điều này cho phép 
    chúng ta dễ dàng xử lý các dữ liệu JSON trong các request.
*/
app.use(express.json());

//Định nghĩa một route xử lý các request GET đến root path của ứng dụng. Route này sẽ gửi về một response JSON với thông điệp chào mừng
app.get('/',(req, res)=>{

    //Gửi về một response JSON với thông điệp "Welcome to contact book application."
    res.json({ message: "Welcome to contact book application."});
})

/* 
     Export ứng dụng Express để nó có thể được sử dụng trong các file khác. 
    Điều này cho phép chúng ta khởi chạy ứng dụng từ một file khác và thêm các route và middleware khác.
*/
module.exports = app;