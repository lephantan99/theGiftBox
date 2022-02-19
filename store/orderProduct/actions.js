import qs from 'qs'
import { orderProductMutations } from './mutations'

export const orderProductActions = {
  FETCH: {
    /**
     * Used to fetch orderProducts with this module's query state
     */
    DATA: 'orderProduct/fetchData',
    /**
     * Used to fetch more orderProducts with current query state into this module's data
     */
    MORE: 'orderProduct/fetchMoreData',
    /**
     * Used to fetch one orderProduct
     */
    SINGLE: 'orderProduct/fetchSingle',
  },
  SUBMIT: {
    /**
     * Used to create multiple orderProducts
     */
    // MULTIPLE: 'orderProduct/submitMultiple',
    /**
     * Used to create a new orderProduct
     */
    SINGLE: 'orderProduct/submitSingle',
  },
  UPDATE: {
    /**
     * Used to update multiple orderProducts' information
     */
    // MULTIPLE: 'orderProduct/updateMultiple',
    /**
     * Used to update one orderProduct's information
     */
    SINGLE: 'orderProduct/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    /**
     * Used to delete multiple orderProducts
     */
    // MULTIPLE: 'orderProduct/deleteMultiple',
    /**
     * Used to delete one orderProduct
     */
    SINGLE: 'orderProduct/deleteSingle',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$authApi.get(
      '/orderProducts?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(orderProductMutations.SET.DATA, response.data.data, { root: true })
    // Fix total later
    commit(orderProductMutations.SET.TOTAL, response.data.total, { root: true })
    return response.data
  },
  async fetchMoreData({ state, commit }) {
    commit(orderProductMutations.INC.QUERY_PAGE, {}, { root: true })

    const response = await this.$authApi.get(
      '/orderProducts?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(orderProductMutations.ADD.DATA, response.data.results, {
      root: true,
    })
    if (response.data.results.length < 1) {
      // If has no data, substract the query offset by limit, so it doesn't add offset forever with no data
      commit(orderProductMutations.SUB.QUERY_PAGE, {}, { root: true })
    }
    return response.data.results
  },
  async fetchSingle({ commit }, id) {
    const response = await this.$authApi.get('/orderProducts/' + id)
    commit(orderProductMutations.SET.VIEWING, response.data, { root: true })
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$authApi.post('/orderProducts', form)
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.put('/orderProducts/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/orderProducts/' + id)
    return response
  },
}
