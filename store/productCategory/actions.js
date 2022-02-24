import qs from 'qs'
import { productCategoryMutations } from './mutations'

export const productCategoryActions = {
  FETCH: {
    /**
     * Used to fetch productCategorys with this module's query state
     */
    DATA: 'productCategory/fetchData',
    /**
     * Used to fetch more productCategorys with current query state into this module's data
     */
    MORE: 'productCategory/fetchMoreData',
    /**
     * Used to fetch one productCategory
     */
    SINGLE: 'productCategory/fetchSingle',
  },
  SUBMIT: {
    /**
     * Used to create multiple productCategorys
     */
    // MULTIPLE: 'productCategory/submitMultiple',
    /**
     * Used to create a new productCategory
     */
    SINGLE: 'productCategory/submitSingle',
  },
  UPDATE: {
    /**
     * Used to update multiple productCategorys' information
     */
    // MULTIPLE: 'productCategory/updateMultiple',
    /**
     * Used to update one productCategory's information
     */
    SINGLE: 'productCategory/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    /**
     * Used to delete multiple productCategorys
     */
    // MULTIPLE: 'productCategory/deleteMultiple',
    /**
     * Used to delete one productCategory
     */
    SINGLE: 'productCategory/deleteSingle',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$clientApi.get(
      '/product_categories?' +
        qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(productCategoryMutations.SET.DATA, response.data.data, {
      root: true,
    })
    // Fix total later
    commit(productCategoryMutations.SET.TOTAL, response.data.total, {
      root: true,
    })
    return response.data
  },
  async fetchMoreData({ state, commit }) {
    commit(productCategoryMutations.INC.QUERY_PAGE, {}, { root: true })

    const response = await this.$authApi.get(
      '/product_categories?' +
        qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(productCategoryMutations.ADD.DATA, response.data.results, {
      root: true,
    })
    if (response.data.results.length < 1) {
      // If has no data, substract the query offset by limit, so it doesn't add offset forever with no data
      commit(productCategoryMutations.SUB.QUERY_PAGE, {}, { root: true })
    }
    return response.data.results
  },
  async fetchSingle({ commit }, id) {
    const response = await this.$authApi.get('/product_categories/' + id)
    commit(productCategoryMutations.SET.VIEWING, response.data, { root: true })
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$authApi.post('/product_categories', form)
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.put('/product_categories/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/product_categories/' + id)
    return response
  },
}
