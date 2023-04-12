import express from 'express';

import { getPosts ,getPost, createPosts, getPostsBySearch, updatePost, deletePost , likePost, getPostsByTags} from '../controllers/posts.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts );
router.get('/:id', getPost );
// router.get('/search', getPostsBySearch);
router.get('/search/:searchQuery', getPostsBySearch);
router.get('/search/tag/:searchQuery', getPostsByTags);
router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePost);
router.patch('/:id/likePost', auth, likePost);
router.delete('/:id', auth, deletePost);

export default router