const Product = require("../models/product");
const productValidate = require("../validations/product.validation");
const e = require("express");
const Image = require("../models/imageModel");

module.exports = {
  getProduct: async (req, res) => {
    try {
      const id = req.params.id;

      const data = await Product.findById(id);
      if (!data)
        return res.status(404).json({ error: "Không tìm thấy sản phẩm" });

      return res.status(200).json({ data: data });
    } catch (error) {
      console.error(error); // Log lỗi ra console để debug
      return res.status(500).json({ error: "Internal server error" }); // Trả về lỗi
    }
  },
  getProducta: async (req, res) => {
    try {
      const id = req.params.id;

      const data = await Product.findById(id);
      if (!data)
        return res.status(404).json({ error: "Không tìm thấy sản phẩm" });

      return res.status(200).json({ data: data });
    } catch (error) {
      console.error(error); // Log lỗi ra console để debug
      return res.status(500).json({ error: "Internal server error" }); // Trả về lỗi
    }
  },

  getProductsa: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit, 10);
      const page = parseInt(req.query.page, 1);
      const { type } = req.query;
      console.log(type);

      const products = Product.find({
        type,
      }).sort({ _id: -1 });
      const data = await products.skip((page - 1) * limit).limit(limit);
      console.log(products);

      const totalDoc = await Product.countDocuments(); // Sửa lỗi ở đây
      const totalPage = Math.ceil(totalDoc / limit);

      return res.status(200).json({
        data,
        meta: {
          page,
          limit,
          totalDoc,
          totalPage,
        },
      });
    } catch (error) {
      console.error(error); // Log lỗi ra console để debug
      return res.status(500).json({ error: "Internal server error" }); // Trả về lỗi 500 nếu có lỗi xảy ra
    }
  },
  getProducts: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit, 10);
      const page = parseInt(req.query.page, 1);

      const query = Product.find().sort({ _id: -1 });
      const data = await query.skip((page - 1) * limit).limit(limit);

      const totalDoc = await Product.countDocuments(); // Sửa lỗi ở đây
      const totalPage = Math.ceil(totalDoc / limit);

      return res.status(200).json({
        data,
        meta: {
          page,
          limit,
          totalDoc,
          totalPage,
        },
      });
    } catch (error) {
      console.error(error); // Log lỗi ra console để debug
      return res.status(500).json({ error: "Internal server error" }); // Trả về lỗi 500 nếu có lỗi xảy ra
    }
  },

  createProduct: async (req, res) => {
    try {
      const {
        name,
        description,
        quantity,
        quantityp,
        weight,
        price,

        exp,
        type,
        fastdescription,
        feature,
      } = req.body;

      const { error } = productValidate({
        name,
        description,
        quantity,
        quantityp,
        weight,
        price,

        exp,
        type,
        fastdescription,
        feature,
      });

      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const image = req?.file;
      console.log("Image create: ", image);

      if (!image) {
        return res.status(400).json({ error: "Vui lòng thêm ảnh" });
      }

      console.log(image);

      const createdProduct = new Product({
        name,
        description,
        quantity,
        quantityp,
        weight,
        price,

        exp,
        type,
        fastdescription,
        feature,
      });

      createdProduct.images.push({
        // 'public\\images\\image-1619797876169.jpg' => 'public/images/image-1619797876169.jpg'
        path: "/" + image.path.replace(/\\/g, "/"),
        name: image.filename,
      });

      await createdProduct.save();

      return res.status(201).json({ data: createdProduct });
    } catch (error) {
      console.error(error); // Log lỗi ra console để debug
      return res.status(500).json({ error: "Internal server error" }); // Trả về lỗi 500 nếu có lỗi xảy ra
    }
  },

  updateProduct: async (req, res) => {
    try {
      const {
        name,
        description,
        quantity,
        quantityp,
        weight,
        price,

        exp,
        type,
        fastdescription,
        feature,
      } = req.body;

      const existProduct = await Product.findById(req.params.id);

      if (!existProduct)
        return res.status(404).json({ error: "Không tìm thấy sản phẩm" });

      existProduct.name = name || existProduct.name;
      existProduct.description = description || existProduct.description;
      existProduct.fastdescription =
        fastdescription || existProduct.fastdescription;
      existProduct.quantity = quantity || existProduct.quantity;
      existProduct.quantityp = quantityp || existProduct.quantityp;
      existProduct.weight = weight || existProduct.weight;
      existProduct.price = price || existProduct.price;

      existProduct.exp = exp || existProduct.exp;
      existProduct.type = type || existProduct.type;
      existProduct.feature = feature || existProduct.feature;

      const image = req.file;
      console.log("Image: ", image);

      if (image) {
        existProduct.images = [];
        existProduct.images.push({
          path: "/" + image.path.replace(/\\/g, "/"),
          name: image.filename,
        });
      }

      await existProduct.save();

      return res.status(201).json({ data: existProduct });
    } catch (error) {
      console.error(error); // Log lỗi ra console để debug
      return res.status(500).json({ error: "update product server error" }); // Trả về lỗi 500 nếu có lỗi xảy ra
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);

      return res.sendStatus(204);
    } catch (error) {
      console.error(error); // Log lỗi ra console để debug
      return res.status(500).json({ error: "Internal server error" }); // Trả về lỗi 500 nếu có lỗi xảy ra
    }
  },

  reduceQuantity: async (items) => {
    console.log(items);
    for (const item of items) {
      try {
        const product = await Product.findById(
          item.product._id || item.product
        );

        if (!product) {
          throw new Error("Không tìm thấy sản phẩm");
        }

        if (product.quantity < item.quantity) {
          throw new Error("Số lượng sản phẩm này không đủ");
        }

        product.quantity -= item.quantity; // Trừ đi số lượng
        product.saleCount += item.quantity; // Tăng giá trị của salecount

        await product.save(); // Lưu lại sản phẩm sau khi cập nhật
      } catch (error) {
        console.error(error);
        // Xử lý lỗi ở đây
      }
    }
  },

  addQuantity: async (items) => {
    for (const item of items) {
      const product = await Product.findById(item.product._id || item.product);
      product.quantity = product.quantity + item.quantity;
      await product.save();
    }
  },
  searchProduct: async (req, res) => {
    try {
      // Extract query parameters from the request query string
      const { name, description, type, feature, sort } = req.query;

      // Construct the filter object based on the provided query parameters
      const filter = {};

      if (name) {
        filter.name = { $regex: name, $options: "i" };
      }
      if (description) {
        filter.description = { $regex: description, $options: "i" };
      }
      if (type) {
        filter.type = { $regex: type, $options: "i" };
      }
      if (feature) {
        filter.feature = { $regex: feature, $options: "i" };
      }
      let sortCriteria = {};
      if (sort === "asc") {
        sortCriteria = { price: 1 }; // Ascending order
      } else if (sort === "desc") {
        sortCriteria = { price: -1 }; // Descending order
      }
      // Find products based on the constructed filter

      // Find products based on the constructed filter and sort criteria
      const searchResults = await Product.find(filter).sort(sortCriteria);

      // Return the search results
      return res.status(200).json(searchResults);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
