const {MongoClient} = require('mongodb');

//Tạo lớp MogoDB
class MogoDB{

    //Tạo 1 biến kết nối với đường dẫn uri của mongodb được tạo ở tệp tin index.js tại thư mục config
    static connect = async (uri) =>{
        if(this.client) return this.client;             //Nếu thuộc tính client không rỗng thì trả về 
        this.client = await MongoClient.connect(uri);   //Ngược lại, để thuộc tính client thực hiện kết nối với mongodb thông qua đường dẫn uri
        return this.client;                             //trả về client
    };
}

module.exports = MogoDB;