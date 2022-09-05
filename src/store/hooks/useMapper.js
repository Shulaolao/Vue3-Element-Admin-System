import { computed } from 'vue'
import { useStore } from 'vuex'

export function useStateMapper (mapper, mapFn) {
  const store = useStore()
  const storeStateFns = mapFn(mapper)
  const storeState = {}

  console.log(storeStateFns)
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({ $store: store })
    storeState[fnKey] = computed(fn)
  })

  return storeState
}

export function useActionsMapper (mapper, mapFn) {
  const store = useStore()
  const storeActionsFns = mapFn(mapper)
  const storeAction = {}

  Object.keys(storeActionsFns).forEach(fnKey => {
    storeAction[fnKey] = storeActionsFns[fnKey].bind({ $store: store })
  })

  return storeAction
}
