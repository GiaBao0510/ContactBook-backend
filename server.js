const app = require("./app");   //Lấy nội dung từ tệp tin app.js
const config = require("./app/config")
const MongoDB = require('./app/utils/mongodb.util');

async function startServer(){
    try{
        //Thực hiện kết nối với mongodb từ tệp tin index.js trong thư mục /app/config để lấy đường dẫn kết nối đến  
        await MongoDB.connect(config.db.uri);
        console.log('Connected to database!');

        const PORT = config.app.port;   //Lấy địa chỉ công 3000 từ tệp tin index.js trong thư mục /app/config
        //Lắng nghe trên cổng 3000
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT} `);
        });
    }catch{
        console.log("Cannot connect to the database!", error);
        
        //thoát khỏi chương trình. Điều này sẽ ngăn chặn các mã tiếp theo trong hàm startServer() được thực thi
        process.exit();
    }
}

startServer();