import Vue from 'vue'

export const categoryMutations = {
  SET: {
    /**
     * Used to set the data array state of this module
     */
    DATA: 'category/SET_DATA',
    /**
     * Used to set the total state of this module
     */
    TOTAL: 'category/SET_TOTAL',
    /**
     * Used to set the query state of this module
     */
    QUERY: 'category/SET_QUERY',
    /**
     * Used to set the current being viewed user
     */
    VIEWING: 'category/SET_VIEWING',
  },
  CLEAR: {
    /**
     * Used to clear the query state of this module to default
     */
    QUERY: 'category/CLEAR_QUERY',
  },
  TOGGLE: {},
  ADD: {
    DATA: 'category/ADD_DATA',
  },
  REMOVE: {},
  INC: {
    /**
     * Use to increase the offset state of this module in query by 1
     */
    QUERY_PAGE: 'category/INC_QUERY_OFFSET',
  },
  SUB: {
    /**
     * Use to decrease the offset state of this module in query by 1
     */
    QUERY_PAGE: 'category/SUB_QUERY_OFFSET',
  },
}

export default {
  SET_DATA(state, data) {
    Vue.set(state, 'data', data)
  },
  SET_TOTAL(state, total) {
    Vue.set(state, 'total', total)
  },
  SET_QUERY(state, query) {
    Vue.set(state, 'query', { ...state.query, ...query })
  },
  SET_VIEWING(state, viewing) {
    Vue.set(state, 'viewing', viewing)
  },
  ADD_DATA(state, data) {
    Vue.set(state, 'data', [...state.data, ...data])
  },
  CLEAR_QUERY(state) {
    Vue.set(state, 'query', {
      offset: 0,
      limit: 10,
    })
  },
  INC_QUERY_OFFSET(state) {
    Vue.set(state.query, 'offset', state.query.offset + state.query.limit)
  },
  SUB_QUERY_OFFSET(state) {
    Vue.set(state.query, 'offset', state.query.offset - state.query.limit)
  },
}
