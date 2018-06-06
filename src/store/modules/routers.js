import { modelRouterMap, constantRouterMap } from '@/router'
import { getModels } from '@/api/models'

function filterModelRouter(modelRouterMap, models) {
  const accessedRouters = modelRouterMap.filter(model => {
    if (model.children && model.children.length) {
      model.children = filterModelRouter(model.children, models)
      if (model.children.length) {
        return true
      }
    }
    if (models.indexOf(model.name) > -1) {
      return true
    }
    return false
  })
  return accessedRouters
}

const routers = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise((resolve, reject) => {
        getModels().then(response => {
          console.log(modelRouterMap)
          const models = response.data
          const accessedRouters = filterModelRouter(modelRouterMap, models)
          console.log(accessedRouters)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        }).catch(error => {
          console.log('login', error)
          reject(error)
        })
      })
    }
  }
}

export default routers
