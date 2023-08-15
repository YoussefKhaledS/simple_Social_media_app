
export default function validate (shema){
    return (req , res ,next) =>{
        const input = req.body ;
        const {error}  = shema.validate(input) ;
        if(error){
            return res.status(400).json({ error: error.details[0].message });
        }
        req.validatedInput = input ;
        next() ;
    }
    
}

