export const wishlistGetters = {
  /**
   * Used to get wishlist's query state
   */
  QUERY: 'wishlist/query',
}

export default {
  query(state) {
    return state.query
  },
}
