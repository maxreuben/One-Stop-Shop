const { Product } = require("../models/Product");
const { Op, fn } = require("sequelize");

/**
 * @typedef {Object} SearchParams
 *
 * @property {string} [searchQuery] - the search string to look for
 * @property {string} [productId]
 *
 * @property {number} [priceMinimum]
 * @property {number} [priceMaximum]
 * @property {number} [reviewMinimum]
 *
 * @property {string} [category]
 * @property {string} [brand]

 * @property {number} [page] - the number of pages to skip. Starts at 1
 * @property {number} [pageSize] - AKA limit
 * @property {boolean} [raw] - default is true
 *
 * @property {string} [orderBy] - column to order by
 * @property {string} [ascending=false] - order by ascending or descending
 */

/**
 * @typedef {Object} KeyCount
 * @property {string} value;
 * @property {number} count;
 *
 * @typedef {Object} SearchResult
 * @property {number} count
 * @property {Product[]} products
 */

/**
 * Gets a product by productId, or throws an exception if not found
 * @param {string} productId
 * @return {Promise<Product>}
 */
async function getProduct(productId) {
  const { products } = await searchProducts({ productId });
  if (!products || products.length !== 1) {
    throw new Error("Product not found");
  }
  return products[0];
}

/**
 * Returns a list of products given search parameters
 * @param {SearchParams} params
 * @returns {Promise<SearchResult>}
 */
async function searchProducts(params = {}) {
  const order = params.orderBy
    ? [[params.orderBy, params.ascending === "true" ? "ASC" : "DESC"]]
    : [];

  const { count, rows } = await Product.findAndCountAll({
    limit: params.pageSize ?? 50,
    offset: params.page ? (params.page - 1) * params.pageSize : 0,
    where: whereClause(params),
    order,
    raw: Boolean(params.raw) ? params.raw : true,
  });
  return {
    count,
    products: rows,
  };
}

/**
 * Gets the top occurrences for a column. For example, gets the top categories for a search.
 * @param {string} column - the column to aggregate
 * @param {number} count - the number of values to fetch
 * @param {SearchParams} params - the search parameters to return
 * @return {Promise<{value: string, count: number}>}
 */
async function getTopOccurrences(column, count, params) {
  return await Product.findAll({
    attributes: [
      [column, "value"],
      [fn("COUNT", column), "count"],
    ],
    where: {
      ...whereClause(params),
      [column]: {
        [Op.ne]: null,
      },
    },
    group: [column],
    limit: count,
    order: [["count", "DESC"]],
    raw: true,
  });
}

/**
 * Gets the where clause for a search
 * @param {SearchParams} params
 */
function whereClause(params) {
  // Returns an empty array if val is null/undefined.
  // Otherwise, returns an object { [op]: val } which will be used in a where clause
  const opIfDefined = (field, op, val) => ({
    ...(val !== undefined && val !== null && { [field]: { [op]: val } }),
  });
  const searchQuery = params.searchQuery ? `%${params.searchQuery}%` : null;
  return {
    [Op.and]: [
      ...[opIfDefined("id", Op.eq, params.productId)],
      ...[opIfDefined("retailPrice", Op.gte, params.priceMinimum)],
      ...[opIfDefined("retailPrice", Op.lte, params.priceMaximum)],
      ...[opIfDefined("rating", Op.gte, params.reviewMinimum)],
      ...[opIfDefined("brand", Op.eq, params.brand)],
      ...[opIfDefined("category", Op.eq, params.category)],
      ...[opIfDefined("name", Op.iLike, searchQuery)],
    ],
  };
}

module.exports = { getProduct, searchProducts, getTopOccurrences };
