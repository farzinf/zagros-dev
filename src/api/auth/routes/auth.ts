export default {
  routes: [
    {
      method: "GET",
      path: "/auth/providers/auth0/login/callback",
      handler: "auth.loginCallback",
      config: {
        auth: false,
        policies: ["api::auth.is-auth0"],
      },
    },

    {
      method: "GET",
      path: "/auth/providers/auth0/logout/callback",
      handler: "auth.logoutCallback",
      config: {
        auth: false,
        policies: ["api::auth.is-auth0"],
      },
    },
    {
      method: "GET",
      path: "/auth/status",
      handler: "auth.status",
      config: {
        // auth: false,
        auth: {
          // scope: ["authenticated"],
          // strategies: ["users-permissions"],
          strategies: ["users-permissions"],
          // content-api
        },
        // auth?: false | {
        //   scope?: string[];
        //   strategies?: string[];
        // };
        policies: ["api::auth.is-authenticated"],
        // auth: true,
        // policies: ["global::is-authenticated"],
        // middlewares: [],
      },
    },
  ],
};
