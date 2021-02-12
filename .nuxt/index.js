import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\src\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_ef44f8c6 from 'nuxt_plugin_plugin_ef44f8c6' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_plugin_08fdb512 from 'nuxt_plugin_plugin_08fdb512' // Source: .\\vuetify\\plugin.js (mode: 'all')
import nuxt_plugin_workbox_dc833f48 from 'nuxt_plugin_workbox_dc833f48' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_72e138dc from 'nuxt_plugin_metaplugin_72e138dc' // Source: .\\pwa\\meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_7788de50 from 'nuxt_plugin_iconplugin_7788de50' // Source: .\\pwa\\icon.plugin.js (mode: 'all')
import nuxt_plugin_libplugin558ae9f5_acfd3f90 from 'nuxt_plugin_libplugin558ae9f5_acfd3f90' // Source: .\\lib.plugin.558ae9f5.js (mode: 'all')
import nuxt_plugin_index_4a78b10a from 'nuxt_plugin_index_4a78b10a' // Source: .\\firebase\\index.js (mode: 'all')
import nuxt_plugin_pluginclient_502c645a from 'nuxt_plugin_pluginclient_502c645a' // Source: .\\content\\plugin.client.js (mode: 'client')
import nuxt_plugin_pluginserver_3da33f5b from 'nuxt_plugin_pluginserver_3da33f5b' // Source: .\\content\\plugin.server.js (mode: 'server')
import nuxt_plugin_googleanalytics_5bae14e6 from 'nuxt_plugin_googleanalytics_5bae14e6' // Source: .\\google-analytics.js (mode: 'client')
import nuxt_plugin_axios_e6208980 from 'nuxt_plugin_axios_e6208980' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_util_56d02241 from 'nuxt_plugin_util_56d02241' // Source: ..\\src\\plugins\\util.js (mode: 'all')
import nuxt_plugin_highlight_7f0c2e92 from 'nuxt_plugin_highlight_7f0c2e92' // Source: ..\\src\\plugins\\highlight.js (mode: 'client')
import nuxt_plugin_player_30f7e402 from 'nuxt_plugin_player_30f7e402' // Source: ..\\src\\plugins\\player.js (mode: 'client')
import nuxt_plugin_tippy_3c8c24f2 from 'nuxt_plugin_tippy_3c8c24f2' // Source: ..\\src\\plugins\\tippy.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule
const baseStoreOptions = { preserveState: process.client }

function registerModule (path, rawModule, options = {}) {
  return originalRegisterModule.call(this, path, rawModule, { ...baseStoreOptions, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"titleTemplate":"%s - Mehmetali_345","title":"Mehmetali_345","meta":[{"charset":"utf-8"},{"hid":"twitter:card","name":"twitter:card","content":"summary"},{"hid":"twitter:site","name":"twitter:site","content":"@AnakinS07677978"},{"hid":"twitter:creator","name":"twitter:creator","content":"@AnakinS07677978"},{"hid":"twitter:title","name":"twitter:title","content":"mehmetali345.ml"},{"hid":"twitter:description","name":"twitter:description","content":"Site."},{"hid":"og:site_name","name":"og:site_name","content":"mehmetali345.xyz"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"theme-color","name":"theme-color","content":"#212121"},{"hid":"description","name":"description","content":"14 years old Young Developer"},{"hid":"og:description","name":"og:description","content":"Site."}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900&display=swap"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002F@mdi\u002Ffont@latest\u002Fcss\u002Fmaterialdesignicons.min.css"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_ef44f8c6 === 'function') {
    await nuxt_plugin_plugin_ef44f8c6(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_08fdb512 === 'function') {
    await nuxt_plugin_plugin_08fdb512(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_dc833f48 === 'function') {
    await nuxt_plugin_workbox_dc833f48(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_72e138dc === 'function') {
    await nuxt_plugin_metaplugin_72e138dc(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_7788de50 === 'function') {
    await nuxt_plugin_iconplugin_7788de50(app.context, inject)
  }

  if (typeof nuxt_plugin_libplugin558ae9f5_acfd3f90 === 'function') {
    await nuxt_plugin_libplugin558ae9f5_acfd3f90(app.context, inject)
  }

  if (typeof nuxt_plugin_index_4a78b10a === 'function') {
    await nuxt_plugin_index_4a78b10a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_502c645a === 'function') {
    await nuxt_plugin_pluginclient_502c645a(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_3da33f5b === 'function') {
    await nuxt_plugin_pluginserver_3da33f5b(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_5bae14e6 === 'function') {
    await nuxt_plugin_googleanalytics_5bae14e6(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_e6208980 === 'function') {
    await nuxt_plugin_axios_e6208980(app.context, inject)
  }

  if (typeof nuxt_plugin_util_56d02241 === 'function') {
    await nuxt_plugin_util_56d02241(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_highlight_7f0c2e92 === 'function') {
    await nuxt_plugin_highlight_7f0c2e92(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_player_30f7e402 === 'function') {
    await nuxt_plugin_player_30f7e402(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_tippy_3c8c24f2 === 'function') {
    await nuxt_plugin_tippy_3c8c24f2(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
