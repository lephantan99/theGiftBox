export const productCategoryGetters = {
  /**
   * Used to get productCategory's query state
   */
  QUERY: 'productCategory/query',
}

export default {
  query(state) {
    return state.query
  },
}
