import Vue from 'vue';
import app from './components/App.vue';<% if (extraConfig.isUseVueRouter) { %>
import VueRouter from 'vue-router';<% } %>
<% if (extraConfig.isUseVueRouter) { %>
Vue.use(VueRouter);

const App = Vue.extend(app);
const router = new VueRouter();

router.start(App, 'body');
<% } else { %>
const App = new Vue({
  el: 'body',
  components: {
    app
  }
});
<% } %>
Vue.config.debug = process.env.NODE_ENV !== 'production';
