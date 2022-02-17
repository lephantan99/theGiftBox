export const cartGetters = {
  /**
   * Used to get cart's query state
   */
  QUERY: 'cart/query',
}

export default {
  query(state) {
    return state.query
  },
}
