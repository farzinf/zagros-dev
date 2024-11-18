// export default {
//   // 'auth0': {
//   //   enabled: true,
//   //   config: {
//   //     domain: process.env.AUTH0_DOMAIN as string,
//   //     clientId: process.env.AUTH0_CLIENT_ID as string,
//   //     clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
//   //     callbackUrl: process.env.AUTH0_CALLBACK_URL as string,
//   //   },
//   // },
//   "users-permissions": {
//     config: {
//       providers: {
//         auth0: {
//           enabled: true,
//           domain: process.env.AUTH0_DOMAIN as string,
//           clientId: process.env.AUTH0_CLIENT_ID as string,
//           clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
//           callbackUrl: process.env.AUTH0_CALLBACK_URL as string,

//           key: process.env.AUTH0_CLIENT_ID as string,
//           secret: process.env.AUTH0_CLIENT_SECRET as string,
//           subdomain: "farzin",
//           callback: process.env.AUTH0_CALLBACK_URL as string,
//           redirectUri: "http://localhost:1337/api/connect/auth0/callback",
//           // "scope": [
//           //     "openid",
//           //     "email",
//           //     "profile"
//           // ],
//           // scope

//           // hostUri: process.env.AUTH0_HOST_URI as string,

//           // "icon": "",
//           // "enabled": false,
//           // "key": "",
//           // "secret": "",
//           // "subdomain": "my-tenant.eu",
//           // "callback": "api/auth/auth0/callback",
//           // "scope": [
//           //     "openid",
//           //     "email",
//           //     "profile"
//           // ],
//           // "redirectUri": "http://localhost:1337/api/connect/auth0/callback"
//         },
//       },
//       // jwt: {
//       //   expiresIn: '7d',
//       // },
//     },
//   },
// };

// //   "users-permissions": {
// //     config: {
// //       providers: [
// //         {
// //           uid: "auth0",
// //           displayName: "Auth0",
// //           icon: "https://cdn.auth0.com/website/favicon.ico",
// //           createStrategy: (strapi) => {
// //             const Auth0Strategy = require("passport-auth0").Strategy;

// //             return new Auth0Strategy(
// //               {
// //                 domain: env("AUTH0_DOMAIN"),
// //                 clientID: env("AUTH0_CLIENT_ID"),
// //                 clientSecret: env("AUTH0_CLIENT_SECRET"),
// //                 callbackURL:
// //                   strapi.admin.services.passport.getStrategyCallbackURL(
// //                     "auth0"
// //                   ),
// //                 scope: ["openid", "profile", "email"],
// //               },
// //               async (accessToken, refreshToken, extraParams, profile, done) => {
// //                 try {
// //                   // Here you can handle user creation or fetching logic
// //                   const user = await strapi
// //                     .service("plugin::users-permissions.user")
// //                     .fetchById(profile.id);
// //                   if (!user) {
// //                     // Create a new user if not found
// //                     const newUser = await strapi
// //                       .service("plugin::users-permissions.user")
// //                       .create({
// //                         username: profile.displayName,
// //                         email: profile.emails[0].value,
// //                         provider: "auth0",
// //                       });
// //                     return done(null, newUser);
// //                   }
// //                   return done(null, user);
// //                 } catch (error) {
// //                   return done(error);
// //                 }
// //               }
// //             );
// //           },
// //         },
// //       ],
// //     },
// //   },
// // } as const;

// // import { Strapi } from '@strapi/strapi';
// // import { Auth0Strategy } from 'passport-auth0';
// // import passport from 'passport';

// // export default ({ env }: { env: (key: string) => string }) => {
// //   return {
// //     'users-permissions': {
// //       config: {
// //         providers: [
// //           {
// //             uid: 'auth0',
// //             displayName: 'Auth0',
// //             icon: 'https://cdn.auth0.com/website/favicon.ico',
// //             createStrategy: () => {
// //               return new Auth0Strategy(
// //                 {
// //                   domain: env('AUTH0_DOMAIN'),
// //                   clientID: env('AUTH0_CLIENT_ID'),
// //                   clientSecret: env('AUTH0_CLIENT_SECRET'),
// //                   callbackURL: `${env('APP_URL')}/api/auth/auth0/callback`, // Ensure APP_URL is set in .env
// //                   scope: ['openid', 'profile', 'email'],
// //                 },
// //                 async (accessToken, refreshToken, extraParams, profile, done) => {
// //                   try {
// //                     const userService = strapi.service('plugin::users-permissions.user');
// //                     let user = await userService.fetchById(profile.id);

// //                     if (!user) {
// //                       user = await userService.create({
// //                         username: profile.displayName,
// //                         email: profile.emails[0].value,
// //                         provider: 'auth0',
// //                       });
// //                     }

// //                     return done(null, user);
// //                   } catch (error) {
// //                     return done(error);
// //                   }
// //                 }
// //               );
// //             },
// //           },
// //         ],
// //       },
// //     },
// //   };
// // };

// // export default ({ env }: { env: (key: string) => string }) => ({
// //   "users-permissions": {
// //     enabled: true,
// //     config: {
// //       jwt: {
// //         expiresIn: "7d",
// //       },
// //       jwtSecret: env("JWT_SECRET"),
// //       providers: {
// //         auth0: {
// //           enabled: true,
// //           icon: "comment",
// //           key: env("AUTH0_CLIENT_ID"),
// //           secret: env("AUTH0_CLIENT_SECRET"),
// //           callback: env("AUTH0_CALLBACK_URL"),
// //           scope: ["openid", "email", "profile"],
// //           domain: env("AUTH0_DOMAIN"),
// //         },
// //       },
// //     },
// //   },
// // });

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
