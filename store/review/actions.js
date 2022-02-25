import qs from 'qs'
import { reviewMutations } from './mutations'

export const reviewActions = {
  FETCH: {
    /**
     * Used to fetch reviews with this module's query state
     */
    DATA: 'review/fetchData',
    /**
     * Used to fetch more reviews with current query state into this module's data
     */
    MORE: 'review/fetchMoreData',
    /**
     * Used to fetch one review
     */
    SINGLE: 'review/fetchSingle',
  },
  SUBMIT: {
    /**
     * Used to create multiple reviews
     */
    // MULTIPLE: 'review/submitMultiple',
    /**
     * Used to create a new review
     */
    SINGLE: 'review/submitSingle',
  },
  UPDATE: {
    /**
     * Used to update multiple reviews' information
     */
    // MULTIPLE: 'review/updateMultiple',
    /**
     * Used to update one review's information
     */
    SINGLE: 'review/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    /**
     * Used to delete multiple reviews
     */
    // MULTIPLE: 'review/deleteMultiple',
    /**
     * Used to delete one review
     */
    SINGLE: 'review/deleteSingle',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$authApi.get(
      '/reviews?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(reviewMutations.SET.DATA, response.data.data, { root: true })
    // Fix total later
    commit(reviewMutations.SET.TOTAL, response.data.total, { root: true })
    return response.data
  },
  async fetchMoreData({ state, commit }) {
    commit(reviewMutations.INC.QUERY_PAGE, {}, { root: true })

    const response = await this.$authApi.get(
      '/reviews?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(reviewMutations.ADD.DATA, response.data.results, { root: true })
    if (response.data.results.length < 1) {
      // If has no data, substract the query offset by limit, so it doesn't add offset forever with no data
      commit(reviewMutations.SUB.QUERY_PAGE, {}, { root: true })
    }
    return response.data.results
  },
  async fetchSingle({ commit }, id) {
    const response = await this.$authApi.get('/reviews/' + id)
    commit(reviewMutations.SET.VIEWING, response.data, { root: true })
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$authApi.post('/reviews', form)
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.put('/reviews/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/reviews/' + id)
    return response
  },
}
