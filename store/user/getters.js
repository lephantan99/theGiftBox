export const userGetters = {
  /**
   * Used to get user's query state
   */
  QUERY: 'user/query',
}

export default {
  query(state) {
    return state.query
  },
}
