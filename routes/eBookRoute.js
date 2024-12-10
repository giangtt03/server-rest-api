const express = require('express');
const router = express.Router();
const eBookController = require('../controllers/eBookController');

// resful api:
// -- get - lấy dữ liệu
// -- post - tạo mới
// -- put - update
// -- delete - xóa
// -- patch - ghi đè ...

// Route dùng để tạo mới ebooks
router.post('/create', eBookController.createEBook);

// Route lấy danh sách
router.get('/list', eBookController.getAllEBooks);

//api list
router.get('/v1/list', eBookController.getAllEBooksApi);

// Route update theo id
router.put('/update/:id', eBookController.updateEBookById);

// Route xóa theo id
router.delete('/delete/', eBookController.deleteEBookByAuthor);

module.exports = router;
