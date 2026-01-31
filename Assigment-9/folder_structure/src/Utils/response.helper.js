export const successResponse = (res,status=200, message,data=null)=>{
    res.status(status).json({
        message, data
    });
}

export const failedResponse = (res, status=500, message) => {
    res.status(status).json({
        message
    });
};