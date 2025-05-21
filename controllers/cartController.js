const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = async (request, response) => {
  const name = request.params.name;

  try {
    const product = await Product.findByName(name);

    if (!product) {
      response.status(STATUS_CODE.NOT_FOUND);
    }

    await Cart.add(product);

    response.status(STATUS_CODE.FOUND);
  } catch (error) {
    console.error(error);
  }
};

exports.getProductsCount = async () => {
  return await Cart.getProductsQuantity();
};
