export default ({ env }) => ({
  "users-permissions": {
    enabled: true,
    config: {
      jwt: {
        expiresIn: "7d",
      },
      jwtSecret: env("JWT_SECRET"),

      providers: {
        auth0: {
          enabled: true,
          domain: env("AUTH0_DOMAIN"),
          audience: env("AUTH0_AUDIENCE"),
          clientId: env("AUTH0_M2M_CLIENT_ID"),
          clientSecret: env("AUTH0_M2M_CLIENT_SECRET"),
          defaultRole: "authenticated",
        },
      },
    },
  },
});
