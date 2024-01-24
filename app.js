const express = require('express');     //Thêm thư viện express
const cors = require('cors');           // Thêm thư viện cors, cho phép các ứng dụng web từ các nguồn khác nhau có thể truy cập vào API của chúng ta.
const contactRouter = require('./app/routes/contact.route') //Lấy nội dung từ đường dẫn trên
const ApiError = require('./app/api-error') // Lấy nội dung từ đường dẫn trên

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

/*
     Sử dụng phương thức use() của Express để thêm route /api/contacts .Router sử dụng
    đối tượng route contactRouter để xử lý các yêu cầu liên quan đến đường dẫn này
*/
app.use("/api/contacts", contactRouter);

//Xử lý lỗi từ phía client 404
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    //Khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

//Định nghĩa phần mềm xử lý lỗi cuối cùng, sau khi lệnh gọi định tuyến và app.user() khác
app.use((err, req, res, next) => {
    //Middleware xử lý lỗi tập trung
    //Trong các đoạn code xử lý ở các router gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error",
    });
});

//Định nghĩa một route xử lý các request GET đến root path của ứng dụng. Route này sẽ gửi về một response JSON với thông điệp chào mừng
app.get('/',(req, res)=>{
    //Gửi về một response JSON với thông điệp "Welcome to contact book application."
    res.json({ message: "Welcome to contact book application."});
});

/* 
     Export ứng dụng Express để nó có thể được sử dụng trong các file khác. 
    Điều này cho phép chúng ta khởi chạy ứng dụng từ một file khác và thêm các route và middleware khác.
*/
module.exports = app;