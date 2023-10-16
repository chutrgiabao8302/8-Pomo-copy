import Product from "./model.js";

async function post_create_product(req, res) {
  const { product_name, price, brand, desc, origin } = req.body;

  let myProduct = await Product.findOne({
    product_name: product_name,
  });

  if (myProduct) {
    return res.json({
      success: false,
      status: 300,
      msg: `Product existed`,
    });
  } else {
    let newProduct = await new Product({
      product_name: product_name,
      price: price,
      brand: brand,
      desc: desc,
      origin: origin,
    }).save();

    return res.json({
      success: true,
      status: 200,
      msg: `New product created`,
      data: newProduct,
    });
  }
}

async function put_update_product(req, res) {
  const { _id, product_name, price, brand, desc, origin } = req.body;

  try {
    let myProduct = await Product.findById(_id);
    myProduct.product_name = product_name || myProduct.product_name;
    myProduct.price = price || myProduct.price;
    myProduct.brand = brand || myProduct.brand;
    myProduct.desc = desc || myProduct.desc;
    myProduct.origin = origin || myProduct.origin;

    await myProduct.save();
    return res.json({
      success: true,
      status: 200,
      msg: `Updated`,
      data: myProduct,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 404,
      msg: `Product not found`,
    });
  }
}

async function delete_product(req, res) {
  const { _id } = req.params;

  try {
    let deletedProduct = await Product.findByIdAndDelete(_id);
    return res.json({
      success: true,
      status: 200,
      msg: `Deleted`,
      data: deletedProduct,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 404,
      msg: `Product not found`,
    });
  }
}

async function get_find_one_product(req, res) {
  const { _id } = req.params;
  // params khi can truyen len du lieu nho
  // body khi can tryen 1 dong du lieu
  // phuong thuc GET (chi dung truy van) khong ho tro truyen body
  try {
    let myProduct = await Product.findById(_id).lean();
    return res.json({
      success: true,
      status: 200,
      msg: `Product found`,
      data: myProduct,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 404,
      msg: `Product not found`,
    });
  }
}

async function get_find_many_product(req, res) {
  const { keyword } = req.params;
  let regex = { $regex: keyword, $options: "i" };

  let options = [{ product_name: regex }, { origin: regex }, { brand: regex }];

  let products = await Product.find({
    $or: options,
  });
  // tim theo id thi nen try catch
  if (products.length == 0) {
    return res.json({
      success: false,
      status: 404,
      msg: `Products not found`,
    });
  } else {
    return res.json({
      success: true,
      status: 200,
      msg: `Products found`,
      data: products,
    });
  }
}

export {
  post_create_product,
  put_update_product,
  delete_product,
  get_find_one_product,
  get_find_many_product,
};
