//Đây là những câu lệnh khai báo các router handler trong một ứng dụng Node.js sử dụng Express.js hoặc một framework tương tự

//Xử lý yêu cầu HTTP POST để tạo mới một tài nguyên.
exports.create = (req, res) =>{

    /*
        - Trong đoạn code này, nó chỉ gửi về một thông báo đơn giản là "create handler". 
        Trong ứng dụng thực tế, nó sẽ chứa logic để tạo mới tài nguyên và trả về kết quả thích hợp.
    */
    res.send({message: "create handler"});
};

//Xử lý yêu cầu HTTP GET để lấy danh sách tất cả các tài nguyên.
exports.findAll = (req, res) => {
    res.send({message: "findAll handler"});
};

//Xử lý yêu cầu HTTP GET để tài nguyên dựa trên ID.
exports.findOne = (req, res) => {
    res.send({message: "findOne handler"});
};

//Xử lý yêu cầu HTTP PUT để cập nhật tài nguyên đã tồn tại
exports.update = (req, res) => {
    res.send({message: "update handler"});
};

//Xử lý yêu cầu HTTP DELETE để xóa tài nguyên đã được xác định
exports.delete = (req, res) => {
    res.send({message: "delete handler"});
};

//Xử lý yêu cầu HTTP DELETE để xóa tất cả tài nguyên đã tồn tại
exports.deleteAll = (req, res) => {
    res.send({message: "deleteAll handler"});
};

//Xử lý yêu cầu HTTP GET để lấy danh sách các tài nguyên được đánh dấu là yêu thích.
exports.findAllFavorite = (req, res) => {
    res.send({message: "findAllFavorite handler"});
};