// 프로젝트에 사용되는 라이브러리
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dayjs = require('dayjs');

const indexRouter = require('./routes');
const postsRouter = require('./routes/posts');

// model 불러오기.
const { Post } = require("./models");

// mongoDB 연결
mongoose.connect('mongodb://localhost:27017/simple-board');

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected');
});

// app 생성
const app = express();

// 공사_공항 계류장 및 주차장 정보를 데이터베이스에 삽입
async function run() {
  let post = [
    {
      area_apron: 1215527,
      airport: "김포",
      capacity_apron: "144(일반85,소형59)",
      capacity_parking: 10648,
      area_parking: 351089
    },
    {
      area_apron: 404782,
      airport: "김해",
      capacity_apron: "43(일반40,소형3)",
      capacity_parking: 6759,
      area_parking: 190262
    },
    {
      area_apron: 449393,
      airport: "제주",
      capacity_apron: "42(일반40,소형2)",
      capacity_parking: 3578,
      area_parking: 142184
    },
    {
      area_apron: 120390,
      airport: "청주",
      capacity_apron: "21(일반13,소형8)",
      capacity_parking: 5030,
      area_parking: 155575
    },
    {
      area_apron: 51182,
      airport: "대구",
      capacity_apron: "11(일반11,소형0)",
      capacity_parking: 1669,
      area_parking: 44145
    },
    {
      area_apron: 113094,
      airport: "무안",
      capacity_apron: "50(일반6,소형44)",
      capacity_parking: 3002,
      area_parking: 94890
    },
    {
      area_apron: 72385,
      airport: "양양",
      capacity_apron: "25(일반7,소형18)",
      capacity_parking: 534,
      area_parking: 14734
    },
    {
      area_apron: 44300,
      airport: "광주",
      capacity_apron: "5(일반5,소형0)",
      capacity_parking: 1206,
      area_parking: 38300
    },
    {
      area_apron: 33480,
      airport: "울산",
      capacity_apron: "6(일반4,소형2)",
      capacity_parking: 555,
      area_parking: 26530
    },
    {
      area_apron: 41868,
      airport: "여수",
      capacity_apron: "5(일반5,소형0)",
      capacity_parking: 822,
      area_parking: 30867
    }
  ];

  await Post.create(post);
}

// 데이터베이스에 삽입한 공항정보 출력
async function get() {
  const post = await Post.find({});

  console.log(post);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

run();
get();
module.exports = app;
