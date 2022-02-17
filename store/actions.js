import { authMutations } from './auth/mutations'
import { rootMutations } from './mutations'
import { wishlistMutations } from '~/store/wishlist/mutations'
import { cartMutations } from '~/store/cart/mutations'

const cookieparser = process.server ? require('cookieparser') : undefined
export const rootActions = {
  NUXT_SERVER_INIT: 'nuxtServerInit',
  RESET_STATE: 'resetState',
}
export default {
  // This will run first when nuxt app init
  // Called manually in middleware in SPA mode
  /**
   * Run as a middleware, used in nuxt.config.js as the first global middleware
   * therefore, this action will run first
   * @param {Object} context Vuex default action's first parameter
   * @returns {void} Return nothing
   */
  // nuxtServerInit({ commit }, { req }) {
  //   let auth = null
  //   // Since we don't have localStorage in server side, we gotta use cookie instead
  //   if (req.headers.cookie) {
  //     const parsed = cookieparser.parse(req.headers.cookie)
  //     try {
  //       auth = JSON.parse(parsed.auth)
  //     } catch (err) {
  //       // No valid cookie found
  //       this.$dev.error(err)
  //     }
  //   }
  //   commit(authMutations.SET.AUTH, auth)
  //   commit(rootMutations.SET.SERVER_STATE, true) // Server is ready
  // },
  nuxtServerInit({ commit, state }) {
    let auth = null
    commit(rootMutations.SET.INITIAL_STATE, JSON.parse(JSON.stringify(state)))
    // localStorage.setItem('wishList', JSON.stringify(currentWishList))
    const authString = localStorage.getItem('auth')
    if (authString) {
      auth = JSON.parse(authString)
      commit(authMutations.SET.AUTH, auth)
    }
    commit(rootMutations.SET.SERVER_STATE, true) // Server is ready
    // Set wishlist and cart from LS
    let currentWishList =
      JSON.parse(localStorage.getItem('wishList')) !== null
        ? JSON.parse(localStorage.getItem('wishList'))
        : []
    if (currentWishList.length > 0) {
      commit(wishlistMutations.SET.DATA, currentWishList, {
        root: true,
      })
    }
    let currentCart =
      JSON.parse(localStorage.getItem('cart')) !== null
        ? JSON.parse(localStorage.getItem('cart'))
        : []
    if (currentCart.length > 0) {
      commit(cartMutations.SET.DATA, currentCart, {
        root: true,
      })
    }
  },
}
