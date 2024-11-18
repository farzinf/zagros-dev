import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::message.message", {
  prefix: "",
  only: ["find", "findOne", "create", "delete"],
  except: [],
  config: {
    find: {
      policies: ["global::is-authenticated"],
      middlewares: [],
    },
    findOne: {},
    create: {
      // auth: {
      //   scope: ["authenticated"],
      // },
      policies: ["global::is-authenticated"],
      middlewares: [],
    },
    update: {},
    delete: {
      policies: [],
      middlewares: [],
    },
  },
});
