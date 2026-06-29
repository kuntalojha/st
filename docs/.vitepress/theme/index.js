// .vitepress/theme/index.js
//
// Extends VitePress's default theme and layers our custom CSS on top.
// This is all you need — no framework changes, just drop the files in.
import DefaultTheme from 'vitepress/theme';
import UnitList from './UnitList.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('UnitList', UnitList)
  }
}
