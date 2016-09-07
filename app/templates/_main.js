import Vue from 'vue';
import app from './App';<% if (extraConfig.isUseVueRouter) { %>
import VueRouter from 'vue-router';
import { configRouter } from './route';<% } %>
<% if (extraConfig.isUseVueRouter) { %>
Vue.use(VueRouter);

const App = Vue.extend(app);
const router = new VueRouter();

configRouter(router);
router.start(App, 'app');
<% } else { %>
const App = new Vue({
  el: 'body',
  components: {
    app,
  },
});
<% } %>
Vue.config.debug = process.env.NODE_ENV !== 'production';
