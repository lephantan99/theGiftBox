export const postGetters = {
  /**
   * Used to get product's query state
   */
  QUERY: 'post/query',
}

export default {
  query(state) {
    return state.query
  },
}
