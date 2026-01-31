import { Router } from "express";
import * as postService from './post.service.js'
const router = Router();


router.get('/getAllPosts',postService.getAllPosts)

export default router;