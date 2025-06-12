import { _useMonacoState } from './composables'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
  const getWorkerModule = (moduleUrl: string, label: string) => {
    return new Worker(new URL('../node_modules/monaco-editor/esm/vs/' + moduleUrl + '.js?worker', import.meta.url), {
      name: label,
      type: 'module'
    })
  }
  self.MonacoEnvironment = {
    getWorker (workerId: string, label: string) {
      switch (label) {
        case 'json':
          return getWorkerModule('language/json/json.worker', label)
        case 'css':
        case 'scss':
        case 'less':
          return getWorkerModule('language/css/css.worker', label)
        case 'html':
        case 'handlebars':
        case 'razor':
          return getWorkerModule('language/html/html.worker', label)
        case 'typescript':
        case 'javascript':
          return getWorkerModule('language/typescript/ts.worker', label)
        default:
          return getWorkerModule('editor/editor.worker', label)
      }
    }
  }

  const monacoState = _useMonacoState()
  monacoState.value = await import('monaco-editor')
})
