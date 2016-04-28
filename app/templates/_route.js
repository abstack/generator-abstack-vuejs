const components = {};
components.Hello = require('./components/Hello.vue');

export function configRouter(router) {
  router.map({
    '/': {
      component: components.Hello,
    },
  });
}
