// import { factories } from "@strapi/strapi";

export default {
  routes: [
    // {
    //   method: "GET",
    //   path: "/auth/userdata",
    //   handler: "auth.getUserData",
    //   config: {
    //     auth: false,
    //     // policies: [],
    //     // middlewares: [],
    //   },
    // },
    // {
    //   method: "GET",
    //   path: "/auth/success",
    //   handler: "auth.success",
    //   config: {
    //     auth: false,
    //     // policies: [],
    //     // middlewares: [],
    //   },
    // },
    // {
    //   method: "GET",
    //   path: "/auth/logout",
    //   handler: "auth.logout",
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },

    {
      method: "GET",
      path: "/auth/providers/auth0/login/callback",
      handler: "auth.loginCallback",
      config: {
        auth: false,
        policies: ["api::auth.is-auth0"],
        // middlewares: [],
      },
    },

    {
      method: "GET",
      path: "/auth/providers/auth0/logout/callback",
      handler: "auth.logoutCallback",
      config: {
        auth: false,
        policies: ["api::auth.is-auth0"],
        // middlewares: [],
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
// http://localhost:1337/login/success?
// id_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQkRRVE5DT1RaR056SkZNRGsyUlRJME16YzNOa1ZHTlRneE1EUXdNVU01TURBeFJFVkROdyJ9.eyJnaXZlbl9uYW1lIjoiRmFyemluIiwiZmFtaWx5X25hbWUiOiJGYWxhaGF0aSIsIm5pY2tuYW1lIjoiZmFyemluLmZhbGFoYXRpIiwibmFtZSI6IkZhcnppbiBGYWxhaGF0aSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJUDFIazNZQWFwNE1LTzRRVEJ0U0FVSHVKV3F6WU5tVXQxX3piYWt3ejJVOVpWUzFLcz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTExLTE2VDA5OjE5OjQ2LjcyMloiLCJlbWFpbCI6ImZhcnppbi5mYWxhaGF0aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyIsImF1ZCI6IkFYR3dwMEUxazVzeWpYem50Q0NwSml3c2FLQWJ4QjF6IiwiaWF0IjoxNzMxNzQ4Nzg4LCJleHAiOjE3MzE3ODQ3ODgsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjQ4NTQ2NTk5NzQ3MDQ2MDg2Iiwic2lkIjoiSW8wdjVLM2h2MGdWTkRIWjJCa18wdnVxNVd0b056bjYifQ.FyEhUapVOmbEquhh8lHvD00JHtraxf3eenLtqpyKWuuYxx0HFC2rNXIZeihhLx9aQm3YkGFN4_9b7WQ0-aAp60pt-6phpAprHFK8yPdHNDyNPUlZlAwRiT1st6q5BOvJXnWu8Y1nNVc2vaNv-rtTLHR4AdN1WD2Y-QJijO1lSP5oGo0Pr5Kt_L1vHzsOIigfHr3BiUp--oJOC0pv77SUhVO6g6j-ghov6pnJntAc0AXaGI9aOsmQReRm0LIBMuC51LOCgjgsDA64w6hF6EOJ4YZmlvlR01wiCkaj1ZlBWHQEU3JdNvXR9SM_rpPKm9Fmc_pHvSdz-ibs1Be7J1BUWA&access_token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyJ9..GFSXd3RZ4EOqArTk.gW_gONTqBJpxX8XftDSusfEIvecHvBQavwO7-ZNvVdZDOWzhrTFsNN-KHylCNkqcYn2-97JRtme6VgmQ5puqWNjkaNcVWiI_cjxus_Z1iOKGdLh9oTD_Ox_9iBhI2KfpCVK2ZdNoZKi8odMyXuxvnFcAmxZtwXuln8jnoa-9OnpiejwLY3c7g3wsz5bAjXA-Cg3FSczBh4nGBXxSyVt8KU6Cr7zXU8am9ldo5lHwkoHtqyc6r_gTlARCC3u3Sr8Nvlz6T2f-ZfcotspUGu5GaCG758sOVXP7zWvlkHcoQAHFYq9SqQ.rIPc9-xlAofWRSo5ACDAZQ&raw%5Baccess_token%5D=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyJ9..GFSXd3RZ4EOqArTk.gW_gONTqBJpxX8XftDSusfEIvecHvBQavwO7-ZNvVdZDOWzhrTFsNN-KHylCNkqcYn2-97JRtme6VgmQ5puqWNjkaNcVWiI_cjxus_Z1iOKGdLh9oTD_Ox_9iBhI2KfpCVK2ZdNoZKi8odMyXuxvnFcAmxZtwXuln8jnoa-9OnpiejwLY3c7g3wsz5bAjXA-Cg3FSczBh4nGBXxSyVt8KU6Cr7zXU8am9ldo5lHwkoHtqyc6r_gTlARCC3u3Sr8Nvlz6T2f-ZfcotspUGu5GaCG758sOVXP7zWvlkHcoQAHFYq9SqQ.rIPc9-xlAofWRSo5ACDAZQ&raw%5Bid_token%5D=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQkRRVE5DT1RaR056SkZNRGsyUlRJME16YzNOa1ZHTlRneE1EUXdNVU01TURBeFJFVkROdyJ9.eyJnaXZlbl9uYW1lIjoiRmFyemluIiwiZmFtaWx5X25hbWUiOiJGYWxhaGF0aSIsIm5pY2tuYW1lIjoiZmFyemluLmZhbGFoYXRpIiwibmFtZSI6IkZhcnppbiBGYWxhaGF0aSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJUDFIazNZQWFwNE1LTzRRVEJ0U0FVSHVKV3F6WU5tVXQxX3piYWt3ejJVOVpWUzFLcz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTExLTE2VDA5OjE5OjQ2LjcyMloiLCJlbWFpbCI6ImZhcnppbi5mYWxhaGF0aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyIsImF1ZCI6IkFYR3dwMEUxazVzeWpYem50Q0NwSml3c2FLQWJ4QjF6IiwiaWF0IjoxNzMxNzQ4Nzg4LCJleHAiOjE3MzE3ODQ3ODgsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjQ4NTQ2NTk5NzQ3MDQ2MDg2Iiwic2lkIjoiSW8wdjVLM2h2MGdWTkRIWjJCa18wdnVxNVd0b056bjYifQ.FyEhUapVOmbEquhh8lHvD00JHtraxf3eenLtqpyKWuuYxx0HFC2rNXIZeihhLx9aQm3YkGFN4_9b7WQ0-aAp60pt-6phpAprHFK8yPdHNDyNPUlZlAwRiT1st6q5BOvJXnWu8Y1nNVc2vaNv-rtTLHR4AdN1WD2Y-QJijO1lSP5oGo0Pr5Kt_L1vHzsOIigfHr3BiUp--oJOC0pv77SUhVO6g6j-ghov6pnJntAc0AXaGI9aOsmQReRm0LIBMuC51LOCgjgsDA64w6hF6EOJ4YZmlvlR01wiCkaj1ZlBWHQEU3JdNvXR9SM_rpPKm9Fmc_pHvSdz-ibs1Be7J1BUWA&
// raw%5Bscope%5D=openid%20profile%20email&raw%5Bexpires_in%5D=86400&raw%5Btoken_type%5D=Bearer
