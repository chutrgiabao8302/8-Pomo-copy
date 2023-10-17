import {
  POST_create,
  PUT_udpate,
  DELETE_product,
  GET_find_one,
  GET_find_many,
  PUT_sell,
} from "./resolver.js";
import express from "express";
const router = express.Router();

router.post("/create", POST_create);

router.put("/update", PUT_udpate);

router.put("/sell", PUT_sell);

router.delete("/delete/:_id", DELETE_product);

router.get("/find_one/:_id", GET_find_one);

router.get("/find_many/:keyword", GET_find_many);

export default router;
