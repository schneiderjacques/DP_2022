import { createRouter, createWebHistory } from "vue-router";
import ConnexionVue from "@/components/ConnexionVue";
import DayVue from "@/components/DayVue";
import WeekVue from "@/components/WeekVue";
import MonthVue from "@/components/MonthVue";

const routes = [
  {
    path: "/",
    name: "ConnexionVue",
    component: ConnexionVue,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("user")) {
        next("/day");
      } else {
        next();
      }
    },
  },
  {
    path: "/day",
    name: "DayVue",
    component: DayVue,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("user")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/week",
    name: "WeekVue",
    component: WeekVue,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("user")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/month",
    name: "MonthVue",
    component: MonthVue,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("user")) {
        next();
      } else {
        next("/");
      }
    },
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
