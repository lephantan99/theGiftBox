import qs from 'qs'
import { orderMutations } from './mutations'

export const orderActions = {
  FETCH: {
    /**
     * Used to fetch orders with this module's query state
     */
    DATA: 'order/fetchData',
    /**
     * Used to fetch more orders with current query state into this module's data
     */
    MORE: 'order/fetchMoreData',
    /**
     * Used to fetch one order
     */
    SINGLE: 'order/fetchSingle',
  },
  SUBMIT: {
    /**
     * Used to create multiple orders
     */
    // MULTIPLE: 'order/submitMultiple',
    /**
     * Used to create a new order
     */
    SINGLE: 'order/submitSingle',
  },
  UPDATE: {
    /**
     * Used to update multiple orders' information
     */
    // MULTIPLE: 'order/updateMultiple',
    /**
     * Used to update one order's information
     */
    SINGLE: 'order/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    /**
     * Used to delete multiple orders
     */
    // MULTIPLE: 'order/deleteMultiple',
    /**
     * Used to delete one order
     */
    SINGLE: 'order/deleteSingle',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$authApi.get(
      '/orders?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(orderMutations.SET.DATA, response.data.data, { root: true })
    // Fix total later
    commit(orderMutations.SET.TOTAL, response.data.total, { root: true })
    return response.data
  },
  async fetchMoreData({ state, commit }) {
    commit(orderMutations.INC.QUERY_PAGE, {}, { root: true })

    const response = await this.$authApi.get(
      '/orders?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(orderMutations.ADD.DATA, response.data.results, { root: true })
    if (response.data.results.length < 1) {
      // If has no data, substract the query offset by limit, so it doesn't add offset forever with no data
      commit(orderMutations.SUB.QUERY_PAGE, {}, { root: true })
    }
    return response.data.results
  },
  async fetchSingle({ commit }, id) {
    const response = await this.$authApi.get('/orders/' + id)
    commit(orderMutations.SET.VIEWING, response.data, { root: true })
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$authApi.post('/orders', form)
    form.orderProducts.forEach(async (element) => {
      const orderProduct = {
        orderId: response.data.data.id,
        productId: element.id,
        quantity: element.quantity,
      }
      const responseProduct = await this.$authApi.post(
        '/order_products',
        orderProduct
      )
    })
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.put('/orders/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/orders/' + id)
    return response
  },
}
