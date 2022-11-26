const { Product } = require("../models/Product");
const { Op } = require("sequelize");

/**
 * @typedef {Object} SearchParams
 * @property {string} [searchQuery] - the search string to look for
 * @property {number} [priceMinimum]
 * @property {number} [priceMaximum]
 * @property {number} [reviewMinimum]
 * @property {string} [category]
 * @property {number} [page] - the number of pages to skip. Starts at 1
 * @property {number} [pageSize] - AKA limit
 * @property {boolean} [raw] - default is true
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
  const where = {
    ...opIfDefined("discountedPrice", Op.gte, params.priceMinimum),
    ...opIfDefined("discountedPrice", Op.lte, params.priceMaximum),
    ...opIfDefined("rating", Op.gte, params.reviewMinimum),
    ...opIfDefined("category", Op.eq, params.category),
    ...opIfDefined(
      "name",
      Op.like,
      params.searchQuery ? `%${params.searchQuery}%` : null
    ),
  };

  return await Product.findAll({
    limit: params.pageSize ?? 50,
    offset: params.page ? (params.page - 1) * params.pageSize : 0,
    where,
    raw: Boolean(params.raw) ? params.raw : true,
  });
}

module.exports = { searchProducts };
