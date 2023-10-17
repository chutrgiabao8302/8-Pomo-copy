import Product from "./model.js";

// POST_create function
async function POST_create(req, res) {
  const { product_name, price, quantity, catergory, brand, desc, origin } =
    req.body;

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
      quantity: quantity,
      catergory: catergory,
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

async function GET_find_one(req, res) {
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

async function GET_find_many(req, res) {
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

async function PUT_udpate(req, res) {
  const { _id, product_name, price, quantity, catergory, brand, desc, origin } =
    req.body;

  try {
    let myProduct = await Product.findById(_id);
    myProduct.product_name = product_name || myProduct.product_name;
    myProduct.price = price || myProduct.price;
    myProduct.quantity = quantity || myProduct.quantity;
    myProduct.catergory = catergory || myProduct.catergory;
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

async function DELETE_product(req, res) {
  const { _id } = req.params;

  try {
    let deletedProduct = await Product.findByIdAndDelete(_id);
    return res.json({
      success: true,
      status: 200,
      msg: `Deleted`,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 404,
      msg: `Product not found`,
    });
  }
}

async function PUT_sell(req, res) {
  const { _id, product_name, quantity } = req.body;

  let myProduct = await Product.findById(_id);

  if (myProduct) {
    if (myProduct.quantity >= quantity) {
      myProduct.quantity -= quantity;
      await myProduct.save();
      return res.json({
        success: true,
        status: 200,
        msg: `Item sold ${quantity} unit`,
      });
    } else {
      return res.json({
        success: false,
        status: 400,
        msg: `Item sold out`,
        data: {
          product_name,
          price,
        },
      });
    }
  }
}

export {
  POST_create,
  PUT_udpate,
  DELETE_product,
  GET_find_one,
  GET_find_many,
  PUT_sell,
};
