const Product = require("../model/products");
const getAllProductStatic = async (req, res) => {
  const prods = await Product.find({});
  res.status(200).json({ prods, Length: prods.length });
};
const getAllProduct = async (req, res) => {
  const { name, company, featured, sort, fields, numericFilter } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (company) {
    queryObject.company = company;
  }
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (numericFilter) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };
    const regEx = /\b(<|>|=|<=|>=)\b/g;
    let filters = numericFilter.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  const page = Number(req.params.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const prods = await result;
  res.status(200).json({ Length: prods.length, prods });
};

module.exports = { getAllProduct, getAllProductStatic };
