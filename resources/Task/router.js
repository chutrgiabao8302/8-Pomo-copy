import {
    POST_create,
    DELETE_task,
    PUT_update_task,
    GET_find_one,
    GET_find_many
} from "./resolver.js"

import express from "express";

const router = express.Router();

router.post("/create", POST_create);
router.delete("/delete/:_id", DELETE_task);
router.put("/update", PUT_update_task);
router.get("/find_one/:_id", GET_find_one)
router.get("/find_many/:owner", GET_find_many)

export default router;