const express = require('express');     //Import model express
const contacts = require('../controllers/contact.controller');  //Lấy nội dung tệp tin

//Tạo một router để quản lý các tuyến đường liên quan đến danh bạ.
const router = express.Router();

//Định nghĩa tuyến đường cho đường dẫn gốc
router.route("/")
    .get(contacts.findAll)          //Xử lý yêu cầu GET để lấy danh sách
    .post(contacts.create)          //Xử lý yêu cầu POST để tạo tài nguyên
    .delete(contacts.deleteAll);    //Xử lý yêu cầu DELETE để xóa danh sách

//Định nghĩa tuyến đường cho đường dẫn favorite
router.route("/favorite")
    .get(contacts.findAllFavorite); //Xử lý yêu cầu GET để lấy danh sách có tài nguyên ưa thích

//Định nghĩa tuyến đường cho đường dẫn ID đối tượng
router.route("/:id")
    .get(contacts.findOne)          //Xử lý yêu cầu GET để lấy tài nguyên cụ thể
    .post(contacts.update)          //Xử lý yêu cầu POST để cập nhật tài nguyên cụ thể
    .delete(contacts.delete);       //Xử lý yêu cầu GDELETEET để xóa tài nguyên cụ thể

/*
     Xuất router để có thể sử dụng trong các file khác của ứng dụng, 
    giúp tích hợp router này vào ứng dụng chính.
 */    
module.exports = router;