export const categoryGetters = {
  /**
   * Used to get category's query state
   */
  QUERY: 'category/query',
}

export default {
  query(state) {
    return state.query
  },
}
