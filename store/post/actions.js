import qs from 'qs'
import { postMutations } from './mutations'

export const postActions = {
  FETCH: {
    /**
     * Used to fetch posts with this module's query state
     */
    DATA: 'post/fetchData',
    /**
     * Used to fetch more posts with current query state into this module's data
     */
    MORE: 'post/fetchMoreData',
    /**
     * Used to fetch one post
     */
    SINGLE: 'post/fetchSingle',
  },
  SUBMIT: {
    /**
     * Used to create multiple posts
     */
    // MULTIPLE: 'post/submitMultiple',
    /**
     * Used to create a new post
     */
    SINGLE: 'post/submitSingle',
  },
  UPDATE: {
    /**
     * Used to update multiple posts' information
     */
    // MULTIPLE: 'post/updateMultiple',
    /**
     * Used to update one post's information
     */
    SINGLE: 'post/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    /**
     * Used to delete multiple posts
     */
    // MULTIPLE: 'post/deleteMultiple',
    /**
     * Used to delete one post
     */
    SINGLE: 'post/deleteSingle',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$clientApi.get(
      '/posts?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(postMutations.SET.DATA, response.data.data, { root: true })
    // Fix total later
    commit(postMutations.SET.TOTAL, response.data.total, { root: true })
    return response.data
  },
  async fetchMoreData({ state, commit }) {
    commit(postMutations.INC.QUERY_PAGE, {}, { root: true })

    const response = await this.$authApi.get(
      '/posts?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(postMutations.ADD.DATA, response.data.results, { root: true })
    if (response.data.results.length < 1) {
      // If has no data, substract the query offset by limit, so it doesn't add offset forever with no data
      commit(postMutations.SUB.QUERY_PAGE, {}, { root: true })
    }
    return response.data.results
  },
  async fetchSingle({ commit }, id) {
    const response = await this.$authApi.get('/posts/' + id)
    commit(postMutations.SET.VIEWING, response.data, { root: true })
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$authApi.post('/posts', form)
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.put('/posts/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/posts/' + id)
    return response
  },
}
