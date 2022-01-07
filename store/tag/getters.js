export const tagGetters = {
  /**
   * Used to get tag's query state
   */
  QUERY: 'tag/query',
}

export default {
  query(state) {
    return state.query
  },
}
