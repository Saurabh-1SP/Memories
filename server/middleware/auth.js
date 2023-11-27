import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'


const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token,'test');

            req.userId = decodedData?.id;

        }
        else{
            decodedData = jwt.decode(token);

            const User = UserModel(true)

            const UserId = await User.find({email: decodedData?.email}).exec()

            req.userId = UserId[0]._id;
            req.Guser = true;
        }

        next();
    } catch (error) {
        console.log('Error in the Middleware:',error);
    }
}

export default auth;