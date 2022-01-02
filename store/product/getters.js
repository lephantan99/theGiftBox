export const productGetters = {
  /**
   * Used to get product's query state
   */
  QUERY: 'product/query',
}

export default {
  query(state) {
    return state.query
  },
}
