   
const multer = require('multer')
const path = require('path')
const fs = require('fs')

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

   module.exports = upload;
