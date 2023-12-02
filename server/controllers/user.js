import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserModel from '../models/user.js'

export const signin = async (req,res) => {
    const {email,password} = req.body;
    const User = await UserModel(false)

    try {
        const exisitngUser = await User.findOne({email});

        if(!exisitngUser) return res.json({result: "userDontExist"})

        const isPasswordCorret = await bcrypt.compare(password,exisitngUser.password)

        if(!isPasswordCorret) return res.json({result: "passwordIsNotCorret"})

        const token = jwt.sign({email: exisitngUser.email, id: exisitngUser._id},'test')

        res.status(200).json({result: exisitngUser,token})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong',error})
        console.log(error)
    }
}
export const signup = async (req,res) => {
    const User = UserModel(false)

    const {email,password,confirmPassword, firstName, lastName} = req.body;
    try {
        const existingUser = await User.findOne({email});

        if(existingUser) return res.json({result: 'User already exist'})

        if(password !== confirmPassword) return res.json({result: 'Password doesnt match'})

        const hashedPassword = await bcrypt.hash(password,12)
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`, firstName: firstName,lastName: lastName });
        const token = jwt.sign({email: result.email, id: result._id}, 'test')

        res.status(200).json({result, token})
    } catch (error) {
        console.log(error)
        res.status(402).json(error)
    }
}

export const googleSignIn = async (req,res) => {

    const User = UserModel(true);

    try {
        const {name,family_name: lastName, given_name: firstName, email} = req.body.result
        const existingUser = await User.findOne({email});

        if(existingUser) {
            // const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test')
            const token = req.body.token

            res.status(200).json({result: existingUser, token})
        }
        else{

            const result = await User.create({email, name, firstName,lastName});
    
            // const token = jwt.sign({email: result.email, id: result._id}, 'test')

            const token = req.body.token

            res.status(200).json({result, token})
        }
        
    } catch (error) {
        console.log(error)
        res.status(402).json({error})
        
    }
}

export const fetchUser = async (req, res) => {

    const {id} = req.params;

    const Users = [UserModel(true), UserModel(false)]

    let User
    try {
        const user = await Users[0].findById(id)
        User = user
        if(!User){
            const user = await Users[1].findById(id)
            User = user
        }
    } catch (error) {
        // res.status(402).json({message: error.message})
        console.log(error)
    }

    if(!User){
        res.status(204).json({message: "User not found"})
    }
    else{
        const data = {userName: User.name,allPosts: User.allPosts}
    
        res.status(200).json(data)
    }

}
