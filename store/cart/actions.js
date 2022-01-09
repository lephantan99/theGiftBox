import qs from 'qs'
import { tagMutations } from './mutations'

export const tagActions = {
  FETCH: {
    /**
     * Used to fetch tags with this module's query state
     */
    DATA: 'tag/fetchData',
    /**
     * Used to fetch more tags with current query state into this module's data
     */
    MORE: 'tag/fetchMoreData',
    /**
     * Used to fetch one tag
     */
    SINGLE: 'tag/fetchSingle',
  },
  SUBMIT: {
    /**
     * Used to create multiple tags
     */
    // MULTIPLE: 'tag/submitMultiple',
    /**
     * Used to create a new tag
     */
    SINGLE: 'tag/submitSingle',
  },
  UPDATE: {
    /**
     * Used to update multiple tags' information
     */
    // MULTIPLE: 'tag/updateMultiple',
    /**
     * Used to update one tag's information
     */
    SINGLE: 'tag/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    /**
     * Used to delete multiple tags
     */
    // MULTIPLE: 'tag/deleteMultiple',
    /**
     * Used to delete one tag
     */
    SINGLE: 'tag/deleteSingle',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$authApi.get(
      '/tags?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(tagMutations.SET.DATA, response.data.data, { root: true })
    // Fix total later
    commit(tagMutations.SET.TOTAL, response.data.total, { root: true })
    return response.data
  },
  async fetchMoreData({ state, commit }) {
    commit(tagMutations.INC.QUERY_PAGE, {}, { root: true })

    const response = await this.$authApi.get(
      '/tags?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(tagMutations.ADD.DATA, response.data.results, { root: true })
    if (response.data.results.length < 1) {
      // If has no data, substract the query offset by limit, so it doesn't add offset forever with no data
      commit(tagMutations.SUB.QUERY_PAGE, {}, { root: true })
    }
    return response.data.results
  },
  async fetchSingle({ commit }, id) {
    const response = await this.$authApi.get('/tags/' + id)
    commit(tagMutations.SET.VIEWING, response.data, { root: true })
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$authApi.tag('/tags', form)
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.put('/tags/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/tags/' + id)
    return response
  },
}
