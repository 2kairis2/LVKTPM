const ProductType = require("../models/productType");

exports.createProductType = async (red, res) => {
    try {
        const productTypeData = req.body;

        const newProductType = await ProductType.create(productTypeData);

        return res.status(201).json({
            newProductType
        });
    }
    catch {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.getProductTypes = async (res, req) => {
    try {
        const data = await ProductType.findOne();
        return res.status(200).json({ data });
    }
    catch {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.getProductType = async (res, req) => {
    try {
        const productTypeId = req.params.id;
        const data = await ProductType.findOne({ productType: productTypeId });
        return res.status(200).json({ data });
    }
    catch {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.updateProductType = async (res, req) => {
    try {
        const productTypeId = req.params.id;
        const updatedData = req.body;

        const updatedProductType = await ProductType.findOneAndUpdate({ productType: productTypeId }, updatedData);

        if (!updatedProductType) {
            return res.status(404).json({ error: "Product type not found" });
        }
        return res.status(200).json({ updatedProductType });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

exports.deleteProductType = async (res, req) => {
    try {
        const productTypeId = req.params.id;

        const deletedProductType = await ProductType.findOneAndDelete({ productType: productTypeId });

        if (!deletedProductType) {
            return res.status(404).json({ error: "Product type not found" });
        }

        return res.status(200).json({ message: "Product type deleted successfully", deletedProductType });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}