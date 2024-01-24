//Khai báo một lớp mới có tên là ApiError, kế thừa từ lớp Error có sẵn trong JavaScript
class ApiError extends Error{

    //Hàm khởi tạo của lớp ApiError, được gọi khi tạo đối tượng mới của lớp này.
    constructor(statusCode, message){
        super();                        
        this.statusCode = statusCode;
        this.message = message;
    }
}

//Xuất lớp ApiError để các module khác có thể sử dụng nó.
module.exports = ApiError;