//Tạo đối tượng app
const config= {
    app: {
        //Thiết lập giá trị của thuộc tính port là 3000 nếu biến môi trường PORT không được định nghĩa
        //Giá trị của thuộc tính port là giá trị của biến môi trường PORT nếu biến môi trường PORT được định nghĩa.
        port: process.env.PORT || 3000,
    }
}

module.exports = config;    //Xuất đối tượng config ra ngoài module.