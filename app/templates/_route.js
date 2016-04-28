const components = {};
components.Hello = require('./components/Hello');

export function configRouter(router) {
  router.map({
    '/': {
      component: components.Hello,
    },
  });
}
