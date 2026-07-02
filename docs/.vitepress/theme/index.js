// .vitepress/theme/index.js
//
// Extends VitePress's default theme and layers our custom CSS on top.
// This is all you need — no framework changes, just drop the files in.
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import UnitList from './UnitList.vue'
import PdfDownload from './PdfDownload.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(PdfDownload)
    })
  },
  enhanceApp({ app }) {
    app.component('UnitList', UnitList)
  }
}
