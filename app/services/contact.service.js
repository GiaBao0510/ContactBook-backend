const {ObjectId} = require('mongodb');
const Contact = require('../controllers/contact.controller');

class ContactService{
    //Hàm xây dựng
    constructor(client){
        //1. Tạo collection cơ tên là contacts
        this.Contact = client.db().collection('contacts');
    }
    
    //Định nghĩa các phương thức truy xuất đến CSDL sử dụng mongodb API
    
    //1. Hàm "extractConactData" Mục đích: Trích xuất và chuẩn hóa dữ liệu liên hệ từ một đối tượng payload.
    extractConactData(payload){
        //Sao chép thông tin từ đối tượng payload rồi lưu vào đối tượng contact
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };

        //Loại bỏ các trường không xác định
        Objects.keys(this.contact).foreach(
            /*
            - Dùng vòng lặp forEach để duyệt qua từng khóa (key) trong đối tượng contact.
            - Kiểm tra xem giá trị của khóa đó có phải là undefined hay không.
            - Nếu giá trị là undefined, khóa đó sẽ bị xóa khỏi đối tượng contact bằng cách sử dụng delete contact[key].
            */
            (key) => contact[key] === undefined && delete contact[key] 
        );
        return contact;
    }

    //1.Tạo 
    async create(payload){
        //Lấy kết quả tìm kiếm
        const contact = this.extractConactData(payload);

        //Lấy giá trị của việc thực hiện cập nhập document được tìm thấy
        const result = await this.Contact.findOneAndUpdate(
            contact,
            {$set: {favorite: contact.favorite === true} },
            { returnDocument: "after", upsert: true}
        );
        return result.value;
    }

    // Tìm kiếm các document trong collection với điều kiên filter
    async find(filter){
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    //
    async findByName(name){
        //2.1 Tạo bộ lọc: Tạo đối tượng filter với điều kiện tìm kiếm dựa trên trường name:
        return await this.find({
            //regex: new RegExp(name): Sử dụng biểu thức chính quy để so khớp tên, cho phép tìm kiếm linh hoạt hơn (ví dụ: tìm kiếm tên có chứa từ khóa).
            //$options: "i": Chỉ định so khớp không phân biệt hoa thường (case-insensitive).
            name: {$regex: new RegExp(name), $options: "i"},
        });
    }

    //Hàm này tìm kiếm đối tượng dựa trên ID
    async findById(id){
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null //Nếu có giá trị thì tao .....Ngược lại thì đặt là null
        });
    }

    //Hàm cập nhật document dựa trên ID
    async update(id , payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id):null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument: "after"}
        );
        return result.value;
    }

    //tìm kiếm tài liệu theo Id và xóa tài liệu này
    async delete(id){
        const result = {
            _id: ObjectId.isValid(id) ? new ObjectId(id):null,
        };
        return result.value;
    }

    //tìm kiếm 
    async findFavorite(){
        return await this.find({favorite: true});
    }

    //Xóa tất cả document trong collection
    async deleteAll(){
        const result = await this.Contact.deleteMany({});
        return result.deleteCount;
    }
}

module.exports = ContactService;