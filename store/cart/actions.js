import qs from 'qs'
import { cartMutations } from './mutations'

export const cartActions = {
  FETCH: {
    /**
     * Used to fetch carts with this module's query state
     */
    DATA: 'cart/fetchData',
    /**
     * Used to fetch more carts with current query state into this module's data
     */
    MORE: 'cart/fetchMoreData',
    /**
     * Used to fetch one cart
     */
    SINGLE: 'cart/fetchSingle',
  },
  SUBMIT: {
    /**
     * Used to create multiple carts
     */
    // MULTIPLE: 'cart/submitMultiple',
    /**
     * Used to create a new cart
     */
    SINGLE: 'cart/submitSingle',
  },
  UPDATE: {
    /**
     * Used to update multiple carts' information
     */
    // MULTIPLE: 'cart/updateMultiple',
    /**
     * Used to update one cart's information
     */
    SINGLE: 'cart/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    /**
     * Used to delete multiple carts
     */
    // MULTIPLE: 'cart/deleteMultiple',
    /**
     * Used to delete one cart
     */
    SINGLE: 'cart/deleteSingle',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$authApi.get(
      '/carts?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(cartMutations.SET.DATA, response.data.data, { root: true })
    // Fix total later
    commit(cartMutations.SET.TOTAL, response.data.total, { root: true })
    return response.data
  },
  async fetchMoreData({ state, commit }) {
    commit(cartMutations.INC.QUERY_PAGE, {}, { root: true })

    const response = await this.$authApi.get(
      '/carts?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(cartMutations.ADD.DATA, response.data.results, { root: true })
    if (response.data.results.length < 1) {
      // If has no data, substract the query offset by limit, so it doesn't add offset forever with no data
      commit(cartMutations.SUB.QUERY_PAGE, {}, { root: true })
    }
    return response.data.results
  },
  async fetchSingle({ commit }, id) {
    const response = await this.$authApi.get('/carts/' + id)
    commit(cartMutations.SET.VIEWING, response.data, { root: true })
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$authApi.cart('/carts', form)
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.put('/carts/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/carts/' + id)
    return response
  },
}
