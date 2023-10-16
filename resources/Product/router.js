import {
  post_create_product,
  put_update_product,
  delete_product,
  get_find_one_product,
  get_find_many_product,
} from "./resolver.js";
import express from "express";
const router = express.Router();

router.post("/create", post_create_product);

router.put("/update", put_update_product);

router.delete("/delete/:_id", delete_product);
// : có nghãi là params

router.get("/find_one/:_id", get_find_one_product);
// ban chat la read

router.get("/find_many/:keyword", get_find_many_product);

export default router;
