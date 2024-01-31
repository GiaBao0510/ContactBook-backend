//Đây là những câu lệnh khai báo các router handler trong một ứng dụng Node.js sử dụng Express.js hoặc một framework tương tự

const ApiError = require("../api-error");
const ContactService = require('../services/contact.service');
const MongoDB = require('../utils/mongodb.util');

//Xử lý yêu cầu HTTP POST để tạo mới một tài nguyên.
exports.create = async (req, res, next) =>{

    /*
    - if(!req.body?.name): Điều kiện này kiểm tra xem thuộc tính name có tồn tại trong req.body hay không.
        + req.body chứa dữ liệu được gửi lên từ client trong phần thân của request.
        + ?. là toán tử optional chaining để tránh lỗi nếu req.body không tồn tại.
    - Nếu điều kiện này đúng (tức là trường name không tồn tại hoặc có giá trị null hoặc undefined), đoạn mã sẽ thực hiện bước tiếp theo.
    */
    if(!req.body?.name){
        return next(new ApiError(400, "Name can't be empty"));
    }
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500, "An Error occured while creating the contact")
        );
    }
};

//Xử lý yêu cầu HTTP GET để lấy danh sách tất cả các tài nguyên.
exports.findAll = async (req, res, next) => {
    let documents = []; //Tạo 1 list
    try{
        const contactService = new ContactService(MongoDB.client);
        const {name } = req.query;

        //Nếu tên này không rỗng thì tìm nó
        if(name) {
            documents = await contactService.findByName(name);
        }else{
            //Nếu rỗng thì in ra tất cả
            documents = await contactService.find({});
        }
    }catch(error){  //Lỗi phía server
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents); //Trả về 1 mảng
};

//Xử lý yêu cầu HTTP GET để tài nguyên dựa trên ID.
exports.findOne = async (req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);

    }catch(error){
        return next(
            new ApiError(500, `Error retrieving contact with id= ${req.params.id}`)
        );
    }
};

//Xử lý yêu cầu HTTP PUT để cập nhật tài nguyên đã tồn tại
exports.update = async (req, res) => {
    if(Object.keys(req.body).length == 0){
        return next(new ApiError(400, "Data toupdate can't to empty"));
    }
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was updated successfully"});
    }catch(error){
        return next(
            new ApiError(500, `Error updating contact with id= ${req.params.id}`)
        );
    }
};

//Xử lý yêu cầu HTTP DELETE để xóa tài nguyên đã được xác định
exports.delete = async (req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was updated successfully"});
    }catch(error){
        return next(
            new ApiError(500, `Error updating contact with id= ${req.params.id}`)
        );
    }
};

//Xử lý yêu cầu HTTP DELETE để xóa tất cả tài nguyên đã tồn tại
exports.deleteAll = async (req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll(req.params.id);
        return res.send({message: `${deletedCount} contacts were deleted successfully!`});
    }catch(error){
        return next(
            new ApiError(500, `Error updating contact with id= ${req.params.id}`)
        );
    }
};

//Xử lý yêu cầu HTTP GET để lấy danh sách các tài nguyên được đánh dấu là yêu thích.
exports.findAllFavorite = async (req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite();
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500, `An Error occured while creating the contact`)
        );
    }
};