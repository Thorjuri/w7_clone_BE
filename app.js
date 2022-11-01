const express = require('express');
const app = express();
const port = 3000;
const Router = require('./routes/index');
const errorHandlerMiddleware = require('./middlewares/error_handler_middleware');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('./models');
const multer = require('multer')
const path = require('path')
const fs = require('fs')

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
        exposedHeaders: 'Authorization',
    })
);

app.options('*', cors());



try{
    fs.readdirSync('uploads')
} catch (error){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads')
}

const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits : { fileSize: 7 * 2048 * 2048 }
})

app.get('/post', (req, res)=> {
    res.sendFile('/post.html')
})

app.post('/post/upload', upload.single('image'), (req, res)=> {
    console.log(req.file, req.body);
    res.send('ok')
})


app.use('/', Router);
app.use('/', errorHandlerMiddleware); // 에러 핸들러

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});
