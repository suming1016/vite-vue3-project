import type { Pinia } from 'pinia'
import { createPinia } from 'pinia'
import type { App } from 'vue'

let pinia: Pinia

export interface InitStoreOptions {
  /**
   * @zh_CN 应用名,为了防止多个app缓存冲突，可在这里配置应用名,应用名将被用于持久化的前缀
   */
  namespace: string
}

/**
 * @zh_CN 初始化pinia
 */
export async function initStores(app: App, options: InitStoreOptions) {
  const { createPersistedState } = await import('pinia-plugin-persistedstate')
  pinia = createPinia()
  const { namespace } = options
  pinia.use(
    createPersistedState({
      // key $appName-$store.id
      key: storeKey => `${namespace}-${storeKey}`,
      storage: localStorage,
    }),
  )
  app.use(pinia)
  return pinia
}

export function resetAllStores() {
  if (!pinia) {
    console.error('Pinia is not installed')
    return
  }
  const allStores = (pinia as unknown as { _s: Record<string, unknown> })._s
  for (const [, store] of Object.entries(allStores)) {
    ;(store as { $reset: () => void }).$reset()
  }
}
