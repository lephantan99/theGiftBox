export const orderGetters = {
  /**
   * Used to get order's query state
   */
  QUERY: 'order/query',
}

export default {
  query(state) {
    return state.query
  },
}
