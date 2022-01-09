import qs from 'qs'
import { wishlistMutations } from './mutations'

export const wishlistActions = {
  FETCH: {
    /**
     * Used to fetch wishlists with this module's query state
     */
    DATA: 'wishlist/fetchData',
    /**
     * Used to fetch more wishlists with current query state into this module's data
     */
    MORE: 'wishlist/fetchMoreData',
    /**
     * Used to fetch one wishlist
     */
    SINGLE: 'wishlist/fetchSingle',
  },
  SUBMIT: {
    /**
     * Used to create multiple wishlists
     */
    // MULTIPLE: 'wishlist/submitMultiple',
    /**
     * Used to create a new wishlist
     */
    SINGLE: 'wishlist/submitSingle',
  },
  UPDATE: {
    /**
     * Used to update multiple wishlists' information
     */
    // MULTIPLE: 'wishlist/updateMultiple',
    /**
     * Used to update one wishlist's information
     */
    SINGLE: 'wishlist/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    /**
     * Used to delete multiple wishlists
     */
    // MULTIPLE: 'wishlist/deleteMultiple',
    /**
     * Used to delete one wishlist
     */
    SINGLE: 'wishlist/deleteSingle',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$authApi.get(
      '/wishlists?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(wishlistMutations.SET.DATA, response.data.data, { root: true })
    // Fix total later
    commit(wishlistMutations.SET.TOTAL, response.data.total, { root: true })
    return response.data
  },
  async fetchMoreData({ state, commit }) {
    commit(wishlistMutations.INC.QUERY_PAGE, {}, { root: true })

    const response = await this.$authApi.get(
      '/wishlists?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(wishlistMutations.ADD.DATA, response.data.results, { root: true })
    if (response.data.results.length < 1) {
      // If has no data, substract the query offset by limit, so it doesn't add offset forever with no data
      commit(wishlistMutations.SUB.QUERY_PAGE, {}, { root: true })
    }
    return response.data.results
  },
  async fetchSingle({ commit }, id) {
    const response = await this.$authApi.get('/wishlists/' + id)
    commit(wishlistMutations.SET.VIEWING, response.data, { root: true })
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$authApi.wishlist('/wishlists', form)
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.put('/wishlists/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/wishlists/' + id)
    return response
  },
}
