export const orderProductGetters = {
  /**
   * Used to get orderProduct's query state
   */
  QUERY: 'orderProduct/query',
}

export default {
  query(state) {
    return state.query
  },
}
