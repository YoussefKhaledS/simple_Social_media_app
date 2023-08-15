const multerErrorHandeler = (err , req, res , next)=>{
    if(err) return res.status(400).json({"message" : err}) ;
    next() ;
}
export default multerErrorHandeler ;