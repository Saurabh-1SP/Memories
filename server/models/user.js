import mongoose from 'mongoose'

const UserModel = (googleSignIn) => {
    const commenFeilds = {
        name: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        allPosts: [{type: mongoose.Schema.Types.ObjectId , ref: "PostMessage"}],
    }

    if (googleSignIn) {
        const userSchema = new mongoose.Schema(commenFeilds)

        if (mongoose.models.Guser) {
            return mongoose.models.Guser;
        }

        const User = mongoose.model('Guser', userSchema)

        return User
    }

    else {

        const password = { password: { type: String, required: true}}
        const userSchema = new mongoose.Schema({
            ...commenFeilds,
            ...password
        })

        if (mongoose.models.User) {
            return mongoose.models.User;
        }

        const User = mongoose.model('User', userSchema)

        return User
    }

}

export default UserModel;