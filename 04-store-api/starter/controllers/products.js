const Products = require("../models/product");

const getAllProductsStatic = async (req, res) => {};

const getAllProducts = async (req, res) => {
  const { featured, name, company, fields, sort, numericFilters } = req.query;
  const objectQuery = {};

  if (featured) {
    objectQuery.featured = featured === "true" ? true : false;
  }
  if (company) {
    objectQuery.company = company;
  }
  if (name) {
    objectQuery.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      "=": "$eq",
      ">=": "$gte",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|=|>=|<=|)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field) && operator && !isNaN(value)) {
        objectQuery[field] = { [operator]: Number(value) };
      }
    });
  }
  let result = Products.find(objectQuery);

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  if (sort) {
    const sortedList = sort.split(",").join(" ");
    result = result.sort(sortedList);
  } else {
    result = result.sort("createdAt");
  }
  console.log(objectQuery);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
