export const postCategoryGetters = {
  /**
   * Used to get category's query state
   */
  QUERY: 'post/category/query',
}

export default {
  query(state) {
    return state.query
  },
}
