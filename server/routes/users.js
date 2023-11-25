import express from "express";

import {fetchUser, googleSignIn, signin,signup, } from '../controllers/user.js'

const router = express.Router();

router.post('/signin',signin )
router.post('/signup', signup)
router.post('/google/signin', googleSignIn)
router.get('/:id',fetchUser)

export default router;