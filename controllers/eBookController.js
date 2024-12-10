const eBook = require('../models/eBook'); // import models ebook

// Hàm tạo mới
const createEBook = async (req, res) => {
    try {
        const newEBook = new eBook(req.body);
        await newEBook.save();
        res.status(201).json({ message: 'eBook thêm mới thành công!', data: newEBook });
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi tạo eBook', error: error.message });
    }
};

// hàm lấy danh sách
const getAllEBooks = async (req, res) => {
    try {
        const eBooks = await eBook.find(); 

        res.render('list', { eBooks }); // Render ejs
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách', error: error.message });
    }
};

const getAllEBooksApi = async (req, res) => {
    try {
      const eBooks = await eBook.find(); 
      res.status(200).json({ data: eBooks }); 
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách', error: error.message });
    }
  };
  


// Hàm sửa 
const updateEBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // http code 400: bad requet
        // Validate bookId require
        if (!updateData.bookId) {
            return res.status(400).json({ message: 'bookId la truong bat buoc.' });
        }
        // Validate title phải có ít nhất 3 ký tự
        if (updateData.title && updateData.title.length < 3) {
            return res.status(400).json({ message: 'Title phải có ít nhất 3 kí tự.' });
        }

        // Validate author không được để trống(hàm .trim() dùng để xóa bỏ khảong trắng)
        if (updateData.author !== undefined && updateData.author.trim() === '') {
            return res.status(400).json({ message: 'Author không được để trống.' });
        }

        // Validate price
        if (updateData.price !== undefined) { // Nếu giá không tìm thấy 
            const priceValue = parseFloat(updateData.price);// chuyển từ chuỗi sang float
            if (isNaN(priceValue) || priceValue <= 0) {//nếu không phải là số(isNaN và <=0)
                return res.status(400).json({ message: 'Price phải là số và lớn hơn 0.' });
            }
        }

        // Validate currency chỉ cho phép các giá trị `"USD"`, `"EUR"`, hoặc `"VND"` nếu cập nhật.  
        if (updateData.currency && !['USD', 'EUR', 'VND'].includes(updateData.currency)) {
            return res.status(400).json({ message: 'Currency must be one of the following: USD, EUR, VND.' });
        }

        // Validate details phải là obj
        if (typeof updateData.details !== 'object') {
            return res.status(400).json({ message: 'Details phải là một object.' });
        }

        //update lưu vào db
        const updatedEBook = await eBook.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        // runValidators: true  là một tùy chọn của Mongoose, được sử dụng trong các phương thức cập nhật (như updateOne, updateMany, findByIdAndUpdate, v.v.).
        res.status(200).json({ message: 'eBook update thành công', data: updatedEBook });
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi update', error: error.message });
    }
};

// Delete theo author
const deleteEBookByAuthor = async (req, res) => {
    try {
        const { author } = req.query;

        // Kiểm tra xem author có tồn tại không
        if (!author) {
            return res.status(400).json({ message: 'Cần cung cấp author.' });
        }

        // Tìm và xóa eBook theo author
        const deletedEBook = await eBook.findOneAndDelete({ author });

        if (!deletedEBook) {
            // Nếu không có sách nào bị xóa, trả về thông báo lỗi
            return res.status(404).json({ message: 'Không tìm thấy eBook với author này.' });
        }

        res.status(200).json({ message: 'eBooks đã được xóa thành công!' });
    } catch (error) {
        console.error('Lỗi khi xóa eBook:', error);
        res.status(500).json({ message: 'Lỗi khi xóa eBooks', error: error.message });
    }
};

module.exports = {
    createEBook,
    getAllEBooks,
    updateEBookById,
    deleteEBookByAuthor,
    getAllEBooksApi
};
