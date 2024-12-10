const mongoose = require('mongoose');

const eBookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,// những trường được nhận là required có nghĩa là không được để trống(trường bắt buộc) khi lưu vào db.
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  details: {
    pages: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model('eBook', eBookSchema);