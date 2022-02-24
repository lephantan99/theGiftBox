import qs from 'qs'
import { productMutations } from './mutations'

export const productActions = {
  FETCH: {
    /**
     * Used to fetch products with this module's query state
     */
    DATA: 'product/fetchData',
    /**
     * Used to fetch more products with current query state into this module's data
     */
    MORE: 'product/fetchMoreData',
    /**
     * Used to fetch one product
     */
    SINGLE: 'product/fetchSingle',
  },
  SUBMIT: {
    /**
     * Used to create multiple products
     */
    // MULTIPLE: 'product/submitMultiple',
    /**
     * Used to create a new product
     */
    SINGLE: 'product/submitSingle',
  },
  UPDATE: {
    /**
     * Used to update multiple products' information
     */
    // MULTIPLE: 'product/updateMultiple',
    /**
     * Used to update one product's information
     */
    SINGLE: 'product/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    /**
     * Used to delete multiple products
     */
    // MULTIPLE: 'product/deleteMultiple',
    /**
     * Used to delete one product
     */
    SINGLE: 'product/deleteSingle',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$clientApi.get(
      '/products?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(productMutations.SET.DATA, response.data.data, { root: true })
    // Fix total later
    commit(productMutations.SET.TOTAL, response.data.total, { root: true })
    return response.data
  },
  async fetchMoreData({ state, commit }) {
    commit(productMutations.INC.QUERY_PAGE, {}, { root: true })

    const response = await this.$authApi.get(
      '/products?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(productMutations.ADD.DATA, response.data.results, { root: true })
    if (response.data.results.length < 1) {
      // If has no data, substract the query offset by limit, so it doesn't add offset forever with no data
      commit(productMutations.SUB.QUERY_PAGE, {}, { root: true })
    }
    return response.data.results
  },
  async fetchSingle({ commit }, id) {
    const response = await this.$authApi.get('/products/' + id)
    console.log('123', response)
    commit(productMutations.SET.VIEWING, response.data, { root: true })
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$authApi.post('/products', form)
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.put('/products/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/products/' + id)
    return response
  },
}
