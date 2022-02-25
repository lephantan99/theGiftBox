export const reviewGetters = {
  /**
   * Used to get review's query state
   */
  QUERY: 'review/query',
}

export default {
  query(state) {
    return state.query
  },
}
