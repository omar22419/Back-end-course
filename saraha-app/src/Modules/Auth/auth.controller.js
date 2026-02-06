import {Router} from 'express'
import { login, signup } from './auth.service.js';
import { successResponse } from './../../../../Assigment-9/folder_structure/src/Utils/response.helper';

const router = Router();
router.post('/singup', async(req,res,next)=>{
    const result = await signup(req.body)
    return successResponse(status=201,data=result);
})

router.post('/login', async(req,res,next)=>{
    const result = await login(req.body)
    return successResponse(status=200,data=result);
})