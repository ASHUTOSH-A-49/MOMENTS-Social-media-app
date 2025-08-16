import jwt from "jsonwebtoken";

const auth = async(req,res,next)=>{
    
const secret = process.env.JWT_SECRET_TOKEN
    try {
        //if user tries to post,like,delete as soon as he /she clicks we will pas control to the middleware to check if his token is valid or not 
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length <500 ; //if token  length is less than 500 then it is clear that we have created this token and its not google token

        let decodedData;
        if(token && isCustomAuth){
            //jwt.verify(token: string, secretOrPublicKey: jwt.Secret | jwt.PublicKey, options: jwt.VerifyOptions & { complete: true; })
            decodedData = jwt.verify(token,secret)

            req.userId = decodedData.id;
        }else{
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        // if all this is good then we will pass the control to the next part or middleware 
        next();//this is very important for the middleware to work 
    } catch (error) {
        console.log(error)
    }
}

export default auth