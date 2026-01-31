import jwt from "jsonwebtoken";
import { failedResponse } from "../Utils/response.helper.js";

export const auth = (req, res, next) => {
  try{
    const token = req.headers.authorization;
    if (!token){
      throw new Error("Token required", { cause: { status: 401 } });
    } 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }catch(error){
    if(error.name=='TokenExpiredError'){
      return failedResponse(res,401,'token expired')
    }
    return failedResponse(res,401,'invalidc token')
  }
};