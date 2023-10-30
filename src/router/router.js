import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Shopping List - List",
    component: () => import("@/plugin/shopping-list/list/the-lists.vue"),
  },
  {
    path: "/list/:id",
    name: "Shopping List - Detail",
    component: () => import("@/plugin/shopping-list/detail/list-detail.vue"),
  },
  // {
  //   path: "/:catchAll(.*)",
  //   name: "NotFound",
  //   component: () => import("@/plugin/shopping-list/views/not-found.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
