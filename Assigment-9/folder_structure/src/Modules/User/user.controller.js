import {Router} from 'express';
import { getUser, login, signup, updateUser } from './user.service.js';
import { failedResponse, successResponse } from '../../Utils/response.helper.js';

const router = Router();

router.post('/signup',async (req,res,next)=>{
    try{
        const user = await signup(req.body);
        return successResponse(res,201,"User added successfully.",user);
    }catch(error){
        failedResponse(res, 400, error.message);
    }
})

router.post('/login',async (req,res)=>{
    try{
        const {email , password} = req.body;
        const token = await login(email,password);
        successResponse(res, 200, 'Login successful', token);
    }catch(error){
        failedResponse(res, 400, error.message);
    }
})

router.patch("/:id", async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    successResponse(res,"User updated successfully",user);
  } catch (error) {
    failedResponse(res, 400, error.message);
}
});

router.get('/',async (req,res)=>{
    try{
        const user = await getUser(req.userId)
        successResponse(res,200, 'user retrieve successfully', user)
    }catch(error){
       failedResponse(res, 404, error.message);
    }
})

router.delete('/', async(req,res)=>{
    try{
        const result = await deleteUser(req.userId)
        successResponse(res,200,result.message);
    }catch(error){
        failedResponse(res,400, error.message);
    }
})
export default router;