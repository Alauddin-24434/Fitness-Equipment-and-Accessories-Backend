import { TCart } from "./cart.interface";
import { Cart } from "./cart.model";

const addCartFromClintIntoDB = async (payload: TCart) => {
  // Check if the same product exists in the cart for the user
  const isExistSameProduct = await Cart.findOne({
    userId: payload.userId,
    productId: payload.productId,
  });

  if (isExistSameProduct) {
    // Update the quantity of the existing product in the cart
    const updatedCart = await Cart.updateOne(
      { _id: isExistSameProduct._id },
      { $inc: { prductQuentity: payload.prductQuentity } }
    );
    return updatedCart;
  } else {
    // Create a new cart entry
    const result = await Cart.create(payload);
    return result;
  }
};


const getAllCartIntoDB = async (userId: string) => {
  try {
    // Find cart items for the given userId and populate productId and userId fields

    
    const result = await Cart.find({ userId }).populate("productId").populate("userId");

    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error;
  }
};


const updateCatByIdCartFromDB = async (id: string, quantityStatus: string) => {
  let update;
  if (quantityStatus === 'increment') {
    update = { $inc: { prductQuentity: 1 } };
  } else if (quantityStatus === 'decrement') {
    update = { $inc: { prductQuentity: -1 } };
  } else {
    throw new Error('Invalid quantity status');
  }

  const result = await Cart.findByIdAndUpdate(id, update, { new: true });
  if (!result) {
    throw new Error('Cart item not found');
  }

  return result;
};
const deleteSingleCartFromDB = async (id: string) => {
  const result = await Cart.deleteOne({ _id: id });
  return result;
};

const allCartDeleteOnlySingleUser = async (id: string) => {
  const matchingUser = await Cart.deleteMany({ userId: id });
  return matchingUser;
};

export const cartServices = {
  addCartFromClintIntoDB,
  deleteSingleCartFromDB,
  allCartDeleteOnlySingleUser,
  getAllCartIntoDB,
  updateCatByIdCartFromDB
};
