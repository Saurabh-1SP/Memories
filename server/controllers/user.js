import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signin = async (req,res) => {
    const {email,password} = req.body;

    try {
        const exisitngUser = await User.findOne({email});

        if(!exisitngUser) return res.json({result: "userDontExist"})

        const isPasswordCorret = await bcrypt.compare(password,exisitngUser.password)

        if(!isPasswordCorret) return res.json({result: "passwordIsNotCorret"})

        const token = jwt.sign({email: exisitngUser.email, id: exisitngUser._id},'test')

        res.status(200).json({result: exisitngUser,token})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'})
    }
}
export const signup = async (req,res) => {
    const {email,password,confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(existingUser) return res.json({result: 'User already exist'})

        if(password !== confirmPassword) return res.json({result: 'Password doesnt match'})

        const hashedPassword = await bcrypt.hash(password,12)

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`, firstName: firstName,lastName: lastName});

        const token = jwt.sign({email: result.email, id: result._id}, 'test')

        res.status(200).json({result, token})
    } catch (error) {
        res.status(402).json(error)
    }
}