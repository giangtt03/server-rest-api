const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

app.use(cors());

const port = 3000;
//config biến môi trường
dotenv.config();


//ket noi mongodb
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Db connected')
}).catch((err)=> console.log(err));

//kha nang xu ly du lieu yeu cau(request body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ghi log http(200,400,404...)
app.use(morgan('dev'));

//set views ejs(danh sach)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const eBookRoute = require("./routes/eBookRoute.js") // khai báo routes

app.use('/', eBookRoute);


//lang nghe yeu cau tu may chu
app.listen(process.env.PORT || port, () => console.log(`Server listening on ${process.env.PORT}!`));