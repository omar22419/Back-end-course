import multer from 'multer';
import { allowedFileTypes } from '../../Enums/files.enum.js';
import { BadRequestException } from '../response/error.response.js';

export const uploadToCloud = ({allowedFileTypes=allowedFileTypes.Image}={})=>{
    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'./uploads')
        },
        filename:(req,file,cb)=>{
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1e9)
            cb(null,file.fieldname+'-'+uniqueSuffix)
        }
    })

    const fileFilter = (req,file,cb)=>{
        if(allowedFileTypes.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(BadRequestException({message:`File type ${allowedFileTypes} is not allowed`}),false);
            }
        }
        return multer({storage,fileFilter});
    }