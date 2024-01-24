const app = require("./app");   //Lấy nội dung từ tệp tin app.js
const config = require("./app/config")

//Khởi động máy chủ
// Câu lệnh này lấy giá trị của thuộc tính port trong đối tượng cấu hình và lưu vào biến PORT.
const PORT = config.app.port;

/* 
     Câu lệnh này gọi phương thức listen() của đối tượng ứng dụng để khởi động máy chủ trên cổng PORT. 
    Phương thức listen() trả về một promise. Khi promise hoàn thành, hàm callback sẽ được gọi. 
    Trong hàm callback, chúng ta in thông báo lên console để xác nhận máy chủ đã khởi động thành công.
*/
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});