const { Product } = require("../models/Product");
const { Op } = require("sequelize");

/**
 * @typedef {Object} SearchParams
 * @property {string} [searchQuery] - the search string to look for
 * @property {string} [productId] - Op.eq
 * @property {number} [priceMinimum]
 * @property {number} [priceMaximum]
 * @property {number} [reviewMinimum]
 * @property {string} [category]
 * @property {number} [page] - the number of pages to skip. Starts at 1
 * @property {number} [pageSize] - AKA limit
 * @property {boolean} [raw] - default is true
 * @property {string} [orderBy] - column to order by
 * @property {string} [ascending=false] - order by ascending or descending
 */

/**
 * Returns a list of products given search parameters
 * @param {SearchParams} params
 * @returns {Promise<Product[]>}
 */
async function searchProducts(params = {}) {
  // Returns an empty array if val is null/undefined.
  // Otherwise, returns an object { [op]: val } which will be used in a where clause
  const opIfDefined = (field, op, val) => ({
    ...(val !== undefined && val !== null && { [field]: { [op]: val } }),
  });
  const searchQuery = params.searchQuery ? `%${params.searchQuery}%` : null;
  const where = {
    [Op.and]: [
      ...[opIfDefined("id", Op.eq, params.productId)],
      ...[opIfDefined("retailPrice", Op.gte, params.priceMinimum)],
      ...[opIfDefined("retailPrice", Op.lte, params.priceMaximum)],
      ...[opIfDefined("rating", Op.gte, params.reviewMinimum)],
      ...[opIfDefined("category", Op.eq, params.category)],
      ...[opIfDefined("name", Op.like, searchQuery)],
    ],
  };

  const order = params.orderBy
    ? [[params.orderBy, params.ascending === "true" ? "ASC" : "DESC"]]
    : [];

  return await Product.findAll({
    limit: params.pageSize ?? 50,
    offset: params.page ? (params.page - 1) * params.pageSize : 0,
    where,
    order,
    raw: Boolean(params.raw) ? params.raw : true,
  });
}

module.exports = { searchProducts };
