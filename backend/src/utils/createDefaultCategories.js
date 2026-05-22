import { defaultCategories } from "../constants/defaultCategories.js";
import Category from "../models/category.model.js";

const createDefaultCategories = async (userId) => {
  const categories = defaultCategories.map((category) => ({
    ...category,
    user: userId,
  }));

  await Category.insertMany(categories, { ordered: false });
};

export default createDefaultCategories;

