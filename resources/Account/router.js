import express from "express";
import { post_register, get_login, post_login } from "./resolver.js";
const router = express.Router();

// router.get('/', GET_register)
router.post("/register", post_register);
router.post("/login", post_login);

router.get("/login", get_login);

export default router;
