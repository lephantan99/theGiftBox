import qs from 'qs'
import { categoryMutations } from './mutations'

export const categoryActions = {
  FETCH: {
    /**
     * Used to fetch categories with this module's query state
     */
    DATA: 'product/category/fetchData',
    /**
     * Used to fetch more categories with current query state into this module's data
     */
    MORE: 'product/category/fetchMoreData',
    /**
     * Used to fetch one category
     */
    SINGLE: 'product/category/fetchSingle',
  },
  SUBMIT: {
    /**
     * Used to create multiple categories
     */
    // MULTIPLE: 'product/submitMultiple',
    /**
     * Used to create a new category
     */
    SINGLE: 'product/category/submitSingle',
  },
  UPDATE: {
    /**
     * Used to update multiple categories' information
     */
    // MULTIPLE: 'category/updateMultiple',
    /**
     * Used to update one category's information
     */
    SINGLE: 'product/category/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    /**
     * Used to delete multiple categories
     */
    // MULTIPLE: 'category/deleteMultiple',
    /**
     * Used to delete one category
     */
    SINGLE: 'product/category/deleteSingle',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$clientApi.get(
      '/product_categories?' +
        qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(categoryMutations.SET.DATA, response.data.data, { root: true })
    // Fix total later
    commit(categoryMutations.SET.TOTAL, response.data.total, { root: true })
    return response.data
  },
  async fetchMoreData({ state, commit }) {
    commit(categoryMutations.INC.QUERY_PAGE, {}, { root: true })
    const query = { ...state.query }
    // If has no filter, assign an empty object to it, otherwise parse it
    query.filter = query.filter ? JSON.parse(query.filter) : {}
    // Add default filter "DRINK"
    query.filter.type = { $equals: 'DRINK' }
    // Change it back to string
    query.filter = JSON.stringify(query.filter)

    const response = await this.$authApi.get(
      'product_categories?' + qs.stringify(query, { arrayFormat: 'repeat' })
    )
    commit(categoryMutations.ADD.DATA, response.data.results, { root: true })
    if (response.data.results.length < 1) {
      // If has no data, substract the query offset by limit, so it doesn't add offset forever with no data
      commit(categoryMutations.SUB.QUERY_PAGE, {}, { root: true })
    }
    return response.data.results
  },
  async fetchSingle({ commit }, id) {
    const response = await this.$authApi.get('/product_categories/' + id)
    commit(categoryMutations.SET.VIEWING, response.data, { root: true })
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
