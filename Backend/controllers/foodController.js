import foodModel from "../models/foodModel.js";
import fs from "fs";

export const addFood = async (req, res) => {
  const { name, description, price, category, weight } = req.body;

  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Image is required." });
  }

  if (!name || !description || !price || !category || !weight) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  const imagePath = `${req.file.filename}`;
  const priceNum = Number(price);
  const weightNum = Number(weight);

  const newFood = new foodModel({
    name,
    description,
    price: priceNum,
    category,
    image: imagePath,
    weight: weightNum,
  });

  try {
    await newFood.save();
    res
      .status(201)
      .json({ success: true, message: "Food Added", food: newFood });
  } catch (error) {
    console.error("Add Food Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "An unexpected error occurred.",
    });
  }
};

// all food List----
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item---
export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
