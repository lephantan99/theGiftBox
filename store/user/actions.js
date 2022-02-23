import qs from 'qs'
import { userMutations } from './mutations'
import { authMutations } from '../auth/mutations'

export const userActions = {
  FETCH: {
    /**
     * Used to fetch users with this module's query state
     */
    DATA: 'user/fetchData',
    /**
     * Used to fetch more users with current query state into this module's data
     */
    MORE: 'user/fetchMoreData',
    /**
     * Used to fetch one user
     */
    SINGLE: 'user/fetchSingle',
  },
  SUBMIT: {
    /**
     * Used to create multiple users
     */
    // MULTIPLE: 'user/submitMultiple',
    /**
     * Used to create a new user
     */
    SINGLE: 'user/submitSingle',
  },
  UPDATE: {
    /**
     * Used to update multiple users' information
     */
    // MULTIPLE: 'user/updateMultiple',
    /**
     * Used to update one user's information
     */
    SINGLE: 'user/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    /**
     * Used to delete multiple users
     */
    // MULTIPLE: 'user/deleteMultiple',
    /**
     * Used to delete one user
     */
    SINGLE: 'user/deleteSingle',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$authApi.get(
      '/users?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(userMutations.SET.DATA, response.data.data, { root: true })
    // Fix total later
    commit(userMutations.SET.TOTAL, response.data.total, { root: true })
    return response.data
  },
  async fetchMoreData({ state, commit }) {
    commit(userMutations.INC.QUERY_PAGE, {}, { root: true })

    const response = await this.$authApi.get(
      '/users?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(userMutations.ADD.DATA, response.data.results, { root: true })
    if (response.data.results.length < 1) {
      // If has no data, substract the query offset by limit, so it doesn't add offset forever with no data
      commit(userMutations.SUB.QUERY_PAGE, {}, { root: true })
    }
    return response.data.results
  },
  async fetchSingle({ commit }, id) {
    const response = await this.$authApi.get('/users/' + id)
    commit(userMutations.SET.VIEWING, response.data, { root: true })
    return response
  },
  async submitSingle({ commit }, form) {
    const response = await this.$clientApi.post('/users', form)
    console.log('here', response.data)
    commit(authMutations.SET.AUTH, response.data.data, { root: true }) // Mutating to store for client rendering
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$authApi.put('/users/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$authApi.delete('/users/' + id)
    return response
  },
}
