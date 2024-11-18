import { Context } from "koa";
import { Core } from "@strapi/strapi";
import jwt from "jsonwebtoken";
import { PolicyContext } from "../policies/is-authenticated";

// import axios from "axios";
// import { Core, Data } from "@strapi/types";

export type Auth0IdTokenPayload = {
  given_name: string; // "Farzin";
  family_name: string; // "Falahati";
  nickname: string; // "farzin.falahati";
  name: string; // "Farzin Falahati";
  picture: string; // "https://lh3.googleusercontent.com/a/ACg8ocIP1Hk3YAap4MKO4QTBtSAUHuJWqzYNmUt1_zbakwz2U9ZVS1Ks=s96-c";
  updated_at: Date; //"2024-11-17T07:17:55.157Z";
  email: string; //"farzin.falahati@gmail.com";
  email_verified: boolean; // true;
  iss: string; //"https://farzin.auth0.com/";
  aud: string; //"AXGwp0E1k5syjXzntCCpJiwsaKAbxB1z";
  iat: number; //1731827877;
  exp: number; //1731863877;
  sub: string; //"google-oauth2|115248546599747046086";
  sid: string; //"Io0v5K3hv0gVNDHZ2Bk_0vuq5WtoNzn6";
};

type LoginCallbackParamsType = {
  id_token: string;
  access_token: string;
  raw: {
    access_token: string;
    id_token: string;
    scope: string;
    expires_in: string;
    token_type: string;
  };
};
// type StrapiContext = Context & { strapi: Core.Strapi };

const findUserByAuthPayload = async (
  payload: Auth0IdTokenPayload,
  strapi: Core.Strapi
) =>
  strapi.query("plugin::users-permissions.user").findOne({
    where: { username: payload.sid },
  });

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  loginCallback: async (ctx: Context) => {
    // const { request, response, app, originalUrl, req, res, socket } = ctx;
    // console.log({ request });
    // console.log({ response });
    // console.log({ app });
    // console.log({ originalUrl });
    // console.log({ req });
    // console.log({ res });
    // console.log({ socket });

    // console.log({ strapi });
    // console.log({ strapi_strapi: strapi });
    // console.log({ app: strapi.app });
    // console.log({ services: strapi.services });
    const userService = strapi.service("api::auth.auth");
    userService.loginCallbackHandler();
    // console.log({ apis: strapi.apis });
    // console.log({ strapi });

    // registerMap: [Map],
    //   serviceMap: [Map],
    //   app: [Object],
    //   isLoaded: true,
    //   internal_config: [Object]

    const { id_token } = ctx.request.query as LoginCallbackParamsType;
    if (!id_token) {
      return ctx.send({ error: true, message: "id_token not found!" });
    }

    // const accessTokenDecoded = jwt.decode(requestQuery.access_token);
    // console.log({ accessTokenDecoded });
    const idTokenPayload = jwt.decode(id_token) as Auth0IdTokenPayload;
    console.log({ idTokenPayload });
    // {
    //   idTokenPayload: {
    //     given_name: 'Farzin',
    //     family_name: 'Falahati',
    //     nickname: 'farzin.falahati',
    //     name: 'Farzin Falahati',
    //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocIP1Hk3YAap4MKO4QTBtSAUHuJWqzYNmUt1_zbakwz2U9ZVS1Ks=s96-c',
    //     updated_at: '2024-11-18T04:46:16.688Z',
    //     email: 'farzin.falahati@gmail.com',
    //     email_verified: true,
    //     iss: 'https://farzin.auth0.com/',
    //     aud: 'AXGwp0E1k5syjXzntCCpJiwsaKAbxB1z',
    //     iat: 1731905178,
    //     exp: 1731941178,
    //     sub: 'google-oauth2|115248546599747046086',
    //     sid: 'Io0v5K3hv0gVNDHZ2Bk_0vuq5WtoNzn6'
    //   }
    // }

    // const accessTokenVerified = jwt.verify(
    //   requestQuery.access_token,
    //   process.env.JWT_SECRET
    // ); // Uncomment if needed
    // const idTokenVerified = jwt.verify(
    //   requestQuery.id_token,
    //   process.env.JWT_SECRET,
    //   {
    //     algorithms ''
    //   }

    // ); // Uncomment if needed
    // console.log({ accessTokenVerified });
    // console.log({ idTokenVerified });

    // console.log({ requestQuery });
    let user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { username: idTokenPayload.sid },
    });

    // if (!user) {
    //   const user = await strapi.query("plugin::users-permissions.user").create({
    //     data: {

    //     }
    //   });
    // }
    if (!user) {
      const role = await strapi
        .query("plugin::users-permissions.role")
        .findOne({
          where: { type: strapi.config.defaultRole || "authenticated" },
        });

      user = await strapi.query("plugin::users-permissions.user").create({
        data: {
          // id: idTokenPayload.sid,
          username: idTokenPayload.sid,
          email: idTokenPayload.email,
          provider: "auth0",
          confirmed: true,
          blocked: false,
          role: role.id,
        },
      });
      console.log({ user, defaultRole: strapi.config.defaultRole });
    }
    // console.log({ app: ctx.app });
    // console.log({ strapi: ctx.strapi });
    //  user: Data.ContentType<"plugin::users-permissions.user"> = {};

    // const userService = strapi.service('plugin::users-permissions.user');
    // userService.create()

    // const user = await ctx.strapi
    //   .query("plugin::users-permissions.user")
    //   .findOne({
    //     where: { username: requestQuery.client_id },
    //   });
    // console.log({ user });

    /*
      {
        "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQkRRVE5DT1RaR056SkZNRGsyUlRJME16YzNOa1ZHTlRneE1EUXdNVU01TURBeFJFVkROdyJ9.eyJnaXZlbl9uYW1lIjoiRmFyemluIiwiZmFtaWx5X25hbWUiOiJGYWxhaGF0aSIsIm5pY2tuYW1lIjoiZmFyemluLmZhbGFoYXRpIiwibmFtZSI6IkZhcnppbiBGYWxhaGF0aSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJUDFIazNZQWFwNE1LTzRRVEJ0U0FVSHVKV3F6WU5tVXQxX3piYWt3ejJVOVpWUzFLcz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTExLTE3VDA3OjE3OjU1LjE1N1oiLCJlbWFpbCI6ImZhcnppbi5mYWxhaGF0aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyIsImF1ZCI6IkFYR3dwMEUxazVzeWpYem50Q0NwSml3c2FLQWJ4QjF6IiwiaWF0IjoxNzMxODI3ODc3LCJleHAiOjE3MzE4NjM4NzcsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjQ4NTQ2NTk5NzQ3MDQ2MDg2Iiwic2lkIjoiSW8wdjVLM2h2MGdWTkRIWjJCa18wdnVxNVd0b056bjYifQ.pCMxmVEAwMjwyGDoSxs-yDGG-HdEWtVr7AqceJgeuE3ipf0DM3q_ZrxRG_nYs1H38O_0aGstpMP3FF5sWeMQDmIgiDWfLeScz1NjzBiNybUvPRBHtjnd8UpYyAXC2Tn6Ofc1Tf6VJwf7ggHCa1icLcF6tq8pmVkY5JTQEhJaC5qq-lwTriVlqCJTC-JgUbSgxay_k4Xzdy99UHR-wMesq4cGOUBTXdRvAxbCQ5QUplMqaY2yeN3SXjt2OtIo-fXjxHDdigwRAUStN8nPG8QBeWl2t4gC7IX4avl07sgVRMrkgdR6wB27UiYomv0FJ-rh4HKFHpYCXl25gdnhTWl0vA",
        "access_token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyJ9..0hWBmSm1iujL7J7y.n_Ak5E0j_1ZD7em5IXw4SSDMKWJXa5JZwwbie2g-4qkCESXj_EupyVu73oHZwtv_zpAlarZuclh8ga63bOrNcP_OtCYdji9t--9D0uNDFxDF5aivwnQVxmVQ3QxY_LSSPDPXXxNl09fpRdZEBk60KFldRuNf2XG3xb83hW_HqlIBiPF3-Lt0zyqFlhDclp88EGnjEGeg0MHEDZ5zKs2LQ9TVbbRPTozqI_PQAKQhyHmx5cPjDQfDwDHRUD3HKv5K8IBf5WVJWvMtz4YCGzQgIluOzOy6hxKRd3RbXprm2p_-2171ng.e6xy5wZz4iJZH3rOkHgpVQ",
        "raw": {
          "access_token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyJ9..0hWBmSm1iujL7J7y.n_Ak5E0j_1ZD7em5IXw4SSDMKWJXa5JZwwbie2g-4qkCESXj_EupyVu73oHZwtv_zpAlarZuclh8ga63bOrNcP_OtCYdji9t--9D0uNDFxDF5aivwnQVxmVQ3QxY_LSSPDPXXxNl09fpRdZEBk60KFldRuNf2XG3xb83hW_HqlIBiPF3-Lt0zyqFlhDclp88EGnjEGeg0MHEDZ5zKs2LQ9TVbbRPTozqI_PQAKQhyHmx5cPjDQfDwDHRUD3HKv5K8IBf5WVJWvMtz4YCGzQgIluOzOy6hxKRd3RbXprm2p_-2171ng.e6xy5wZz4iJZH3rOkHgpVQ",
          "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQkRRVE5DT1RaR056SkZNRGsyUlRJME16YzNOa1ZHTlRneE1EUXdNVU01TURBeFJFVkROdyJ9.eyJnaXZlbl9uYW1lIjoiRmFyemluIiwiZmFtaWx5X25hbWUiOiJGYWxhaGF0aSIsIm5pY2tuYW1lIjoiZmFyemluLmZhbGFoYXRpIiwibmFtZSI6IkZhcnppbiBGYWxhaGF0aSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJUDFIazNZQWFwNE1LTzRRVEJ0U0FVSHVKV3F6WU5tVXQxX3piYWt3ejJVOVpWUzFLcz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTExLTE3VDA3OjE3OjU1LjE1N1oiLCJlbWFpbCI6ImZhcnppbi5mYWxhaGF0aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyIsImF1ZCI6IkFYR3dwMEUxazVzeWpYem50Q0NwSml3c2FLQWJ4QjF6IiwiaWF0IjoxNzMxODI3ODc3LCJleHAiOjE3MzE4NjM4NzcsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjQ4NTQ2NTk5NzQ3MDQ2MDg2Iiwic2lkIjoiSW8wdjVLM2h2MGdWTkRIWjJCa18wdnVxNVd0b056bjYifQ.pCMxmVEAwMjwyGDoSxs-yDGG-HdEWtVr7AqceJgeuE3ipf0DM3q_ZrxRG_nYs1H38O_0aGstpMP3FF5sWeMQDmIgiDWfLeScz1NjzBiNybUvPRBHtjnd8UpYyAXC2Tn6Ofc1Tf6VJwf7ggHCa1icLcF6tq8pmVkY5JTQEhJaC5qq-lwTriVlqCJTC-JgUbSgxay_k4Xzdy99UHR-wMesq4cGOUBTXdRvAxbCQ5QUplMqaY2yeN3SXjt2OtIo-fXjxHDdigwRAUStN8nPG8QBeWl2t4gC7IX4avl07sgVRMrkgdR6wB27UiYomv0FJ-rh4HKFHpYCXl25gdnhTWl0vA",
          "scope": "openid profile email",
          "expires_in": "86400",
          "token_type": "Bearer"
        }
      }

      id_token payload decrepted:
      {
        "given_name": "Farzin",
        "family_name": "Falahati",
        "nickname": "farzin.falahati",
        "name": "Farzin Falahati",
        "picture": "https://lh3.googleusercontent.com/a/ACg8ocIP1Hk3YAap4MKO4QTBtSAUHuJWqzYNmUt1_zbakwz2U9ZVS1Ks=s96-c",
        "updated_at": "2024-11-17T07:17:55.157Z",
        "email": "farzin.falahati@gmail.com",
        "email_verified": true,
        "iss": "https://farzin.auth0.com/",
        "aud": "AXGwp0E1k5syjXzntCCpJiwsaKAbxB1z",
        "iat": 1731827877,
        "exp": 1731863877,
        "sub": "google-oauth2|115248546599747046086",
        "sid": "Io0v5K3hv0gVNDHZ2Bk_0vuq5WtoNzn6"
      }
      */
    // Core.CoreAPI;

    // const { identifier, password } = ctx.request.body;

    // if (!identifier || !password) {
    //   return ctx.badRequest('Identifier and password are required');
    // }

    try {
      // Authenticate with Strapi
      // const response = await axios.post(
      //   `http://localhost:1337/api/auth/local`,
      //   {
      //     identifier,
      //     password,
      //   }
      // );
      // const { jwt } = response.data;
      // // Set JWT as a cookie
      // ctx.cookies.set("jwt", jwt, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      //   maxAge: 1000 * 60 * 60 * 24, // 1 day
      //   sameSite: "lax",
      // });
      // ctx.send({
      //   message: "Login successful",
      //   user: response.data.user,
      // });

      // const sanitizedUser = await strapi
      //   .service("plugin::users-permissions.user")
      //   .sanitizeOutput(user, ctx);
      // console.log({ sanitizedUser });
      const token = jwt.sign(
        {
          id: user.id,
        },
        strapi.config.get("plugin::users-permissions.jwtSecret")
      );
      // jwt.verify(
      //   token,
      //   strapi.config.get("plugin::users-permissions.jwtSecret"),
      //   {},
      //   (err, tokenPayload = {}) => {
      //     if (err) {
      //       console.log({ err });
      //       return reject(new Error("Invalid token."));
      //     }
      //     resolve(tokenPayload);
      //   }
      // );
      ctx.send({ user, query: ctx.request.query, token });
    } catch (error) {
      console.error("Login error:", error);
      return ctx.badRequest("Invalid credentials");
    }
  },
  logoutCallback: async (ctx: Context) => ({}),
  status: async (ctx: PolicyContext) => {
    console.log({ controller: "auth.status", ctx, state: ctx.state });
    ctx.send({ logout: true });
  },

  // async loginCallback = (ctx: any) {
  //       // register({ strapi }: { strapi: Core.Strapi }) {
  //       const { request, response, app, originalUrl, req, res, socket, strapi } =
  //         ctx;
  //       console.log({ request });
  //       console.log({ response });
  //       console.log({ app });
  //       // console.log({ originalUrl });
  //       // console.log({ req });
  //       // console.log({ res });
  //       // console.log({ socket });
  //       console.log({ strapi });

  //       const requestQuery = ctx.request.query;
  //       console.log({ requestQuery });
  //       // console.log({ app: ctx.app });
  //       // console.log({ strapi: ctx.strapi });
  //       //  user: Data.ContentType<"plugin::users-permissions.user"> = {};

  //       // const userService = strapi.service('plugin::users-permissions.user');
  //       // userService.create()

  //       // const user = await ctx.strapi
  //       //   .query("plugin::users-permissions.user")
  //       //   .findOne({
  //       //     where: { username: requestQuery.client_id },
  //       //   });
  //       // console.log({ user });

  //       /*
  //     {
  //       "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQkRRVE5DT1RaR056SkZNRGsyUlRJME16YzNOa1ZHTlRneE1EUXdNVU01TURBeFJFVkROdyJ9.eyJnaXZlbl9uYW1lIjoiRmFyemluIiwiZmFtaWx5X25hbWUiOiJGYWxhaGF0aSIsIm5pY2tuYW1lIjoiZmFyemluLmZhbGFoYXRpIiwibmFtZSI6IkZhcnppbiBGYWxhaGF0aSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJUDFIazNZQWFwNE1LTzRRVEJ0U0FVSHVKV3F6WU5tVXQxX3piYWt3ejJVOVpWUzFLcz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTExLTE3VDA3OjE3OjU1LjE1N1oiLCJlbWFpbCI6ImZhcnppbi5mYWxhaGF0aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyIsImF1ZCI6IkFYR3dwMEUxazVzeWpYem50Q0NwSml3c2FLQWJ4QjF6IiwiaWF0IjoxNzMxODI3ODc3LCJleHAiOjE3MzE4NjM4NzcsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjQ4NTQ2NTk5NzQ3MDQ2MDg2Iiwic2lkIjoiSW8wdjVLM2h2MGdWTkRIWjJCa18wdnVxNVd0b056bjYifQ.pCMxmVEAwMjwyGDoSxs-yDGG-HdEWtVr7AqceJgeuE3ipf0DM3q_ZrxRG_nYs1H38O_0aGstpMP3FF5sWeMQDmIgiDWfLeScz1NjzBiNybUvPRBHtjnd8UpYyAXC2Tn6Ofc1Tf6VJwf7ggHCa1icLcF6tq8pmVkY5JTQEhJaC5qq-lwTriVlqCJTC-JgUbSgxay_k4Xzdy99UHR-wMesq4cGOUBTXdRvAxbCQ5QUplMqaY2yeN3SXjt2OtIo-fXjxHDdigwRAUStN8nPG8QBeWl2t4gC7IX4avl07sgVRMrkgdR6wB27UiYomv0FJ-rh4HKFHpYCXl25gdnhTWl0vA",
  //       "access_token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyJ9..0hWBmSm1iujL7J7y.n_Ak5E0j_1ZD7em5IXw4SSDMKWJXa5JZwwbie2g-4qkCESXj_EupyVu73oHZwtv_zpAlarZuclh8ga63bOrNcP_OtCYdji9t--9D0uNDFxDF5aivwnQVxmVQ3QxY_LSSPDPXXxNl09fpRdZEBk60KFldRuNf2XG3xb83hW_HqlIBiPF3-Lt0zyqFlhDclp88EGnjEGeg0MHEDZ5zKs2LQ9TVbbRPTozqI_PQAKQhyHmx5cPjDQfDwDHRUD3HKv5K8IBf5WVJWvMtz4YCGzQgIluOzOy6hxKRd3RbXprm2p_-2171ng.e6xy5wZz4iJZH3rOkHgpVQ",
  //       "raw": {
  //         "access_token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyJ9..0hWBmSm1iujL7J7y.n_Ak5E0j_1ZD7em5IXw4SSDMKWJXa5JZwwbie2g-4qkCESXj_EupyVu73oHZwtv_zpAlarZuclh8ga63bOrNcP_OtCYdji9t--9D0uNDFxDF5aivwnQVxmVQ3QxY_LSSPDPXXxNl09fpRdZEBk60KFldRuNf2XG3xb83hW_HqlIBiPF3-Lt0zyqFlhDclp88EGnjEGeg0MHEDZ5zKs2LQ9TVbbRPTozqI_PQAKQhyHmx5cPjDQfDwDHRUD3HKv5K8IBf5WVJWvMtz4YCGzQgIluOzOy6hxKRd3RbXprm2p_-2171ng.e6xy5wZz4iJZH3rOkHgpVQ",
  //         "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQkRRVE5DT1RaR056SkZNRGsyUlRJME16YzNOa1ZHTlRneE1EUXdNVU01TURBeFJFVkROdyJ9.eyJnaXZlbl9uYW1lIjoiRmFyemluIiwiZmFtaWx5X25hbWUiOiJGYWxhaGF0aSIsIm5pY2tuYW1lIjoiZmFyemluLmZhbGFoYXRpIiwibmFtZSI6IkZhcnppbiBGYWxhaGF0aSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJUDFIazNZQWFwNE1LTzRRVEJ0U0FVSHVKV3F6WU5tVXQxX3piYWt3ejJVOVpWUzFLcz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTExLTE3VDA3OjE3OjU1LjE1N1oiLCJlbWFpbCI6ImZhcnppbi5mYWxhaGF0aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyIsImF1ZCI6IkFYR3dwMEUxazVzeWpYem50Q0NwSml3c2FLQWJ4QjF6IiwiaWF0IjoxNzMxODI3ODc3LCJleHAiOjE3MzE4NjM4NzcsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjQ4NTQ2NTk5NzQ3MDQ2MDg2Iiwic2lkIjoiSW8wdjVLM2h2MGdWTkRIWjJCa18wdnVxNVd0b056bjYifQ.pCMxmVEAwMjwyGDoSxs-yDGG-HdEWtVr7AqceJgeuE3ipf0DM3q_ZrxRG_nYs1H38O_0aGstpMP3FF5sWeMQDmIgiDWfLeScz1NjzBiNybUvPRBHtjnd8UpYyAXC2Tn6Ofc1Tf6VJwf7ggHCa1icLcF6tq8pmVkY5JTQEhJaC5qq-lwTriVlqCJTC-JgUbSgxay_k4Xzdy99UHR-wMesq4cGOUBTXdRvAxbCQ5QUplMqaY2yeN3SXjt2OtIo-fXjxHDdigwRAUStN8nPG8QBeWl2t4gC7IX4avl07sgVRMrkgdR6wB27UiYomv0FJ-rh4HKFHpYCXl25gdnhTWl0vA",
  //         "scope": "openid profile email",
  //         "expires_in": "86400",
  //         "token_type": "Bearer"
  //       }
  //     }

  //     id_token payload decrepted:
  //     {
  //       "given_name": "Farzin",
  //       "family_name": "Falahati",
  //       "nickname": "farzin.falahati",
  //       "name": "Farzin Falahati",
  //       "picture": "https://lh3.googleusercontent.com/a/ACg8ocIP1Hk3YAap4MKO4QTBtSAUHuJWqzYNmUt1_zbakwz2U9ZVS1Ks=s96-c",
  //       "updated_at": "2024-11-17T07:17:55.157Z",
  //       "email": "farzin.falahati@gmail.com",
  //       "email_verified": true,
  //       "iss": "https://farzin.auth0.com/",
  //       "aud": "AXGwp0E1k5syjXzntCCpJiwsaKAbxB1z",
  //       "iat": 1731827877,
  //       "exp": 1731863877,
  //       "sub": "google-oauth2|115248546599747046086",
  //       "sid": "Io0v5K3hv0gVNDHZ2Bk_0vuq5WtoNzn6"
  //     }
  //     */
  //       // Core.CoreAPI;

  //       // const { identifier, password } = ctx.request.body;

  //       // if (!identifier || !password) {
  //       //   return ctx.badRequest('Identifier and password are required');
  //       // }

  //       try {
  //         // Authenticate with Strapi
  //         // const response = await axios.post(
  //         //   `http://localhost:1337/api/auth/local`,
  //         //   {
  //         //     identifier,
  //         //     password,
  //         //   }
  //         // );
  //         // const { jwt } = response.data;
  //         // // Set JWT as a cookie
  //         // ctx.cookies.set("jwt", jwt, {
  //         //   httpOnly: true,
  //         //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  //         //   maxAge: 1000 * 60 * 60 * 24, // 1 day
  //         //   sameSite: "lax",
  //         // });
  //         // ctx.send({
  //         //   message: "Login successful",
  //         //   user: response.data.user,
  //         // });
  //         ctx.send(requestQuery);
  //       } catch (error) {
  //         console.error("Login error:", error);
  //         return ctx.badRequest("Invalid credentials");
  //       }
  //     },

  //     async logoutCallback(ctx: Context) {
  //       ctx.cookies.set("jwt", "", { expires: new Date(0) }); // Clear the cookie
  //       ctx.send({ message: "Logout successful" });
  //     },

  // async getUserData(ctx: Context) {
  //   console.log("step1");
  //   const { authorization } = ctx.request.headers;
  //   console.log({ authorization });
  //   if (!authorization) {
  //     return ctx.badRequest("Authorization header is missing");
  //   }

  //   try {
  //     const response = await axios.get("https://farzin.auth0.com/userinfo", {
  //       headers: {
  //         Authorization: authorization,
  //       },
  //     });

  //     return ctx.send(response.data);
  //   } catch (error) {
  //     console.error("Error fetching user data from Auth0:", error);
  //     return ctx.badRequest("Failed to fetch user data");
  //   }
  // },

  // async success(ctx: Context) {
  //   // const { authorization } = ctx.request.headers;
  //   console.log({ success: "step1" });
  //   const requestQuery = ctx.request.query;
  //   console.log({ requestQuery });
  //   // return ctx.send(requestQuery);
  //   ctx.send(requestQuery);

  //
  //   {
  //     "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQkRRVE5DT1RaR056SkZNRGsyUlRJME16YzNOa1ZHTlRneE1EUXdNVU01TURBeFJFVkROdyJ9.eyJnaXZlbl9uYW1lIjoiRmFyemluIiwiZmFtaWx5X25hbWUiOiJGYWxhaGF0aSIsIm5pY2tuYW1lIjoiZmFyemluLmZhbGFoYXRpIiwibmFtZSI6IkZhcnppbiBGYWxhaGF0aSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJUDFIazNZQWFwNE1LTzRRVEJ0U0FVSHVKV3F6WU5tVXQxX3piYWt3ejJVOVpWUzFLcz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTExLTE3VDA3OjE3OjU1LjE1N1oiLCJlbWFpbCI6ImZhcnppbi5mYWxhaGF0aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyIsImF1ZCI6IkFYR3dwMEUxazVzeWpYem50Q0NwSml3c2FLQWJ4QjF6IiwiaWF0IjoxNzMxODI3ODc3LCJleHAiOjE3MzE4NjM4NzcsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjQ4NTQ2NTk5NzQ3MDQ2MDg2Iiwic2lkIjoiSW8wdjVLM2h2MGdWTkRIWjJCa18wdnVxNVd0b056bjYifQ.pCMxmVEAwMjwyGDoSxs-yDGG-HdEWtVr7AqceJgeuE3ipf0DM3q_ZrxRG_nYs1H38O_0aGstpMP3FF5sWeMQDmIgiDWfLeScz1NjzBiNybUvPRBHtjnd8UpYyAXC2Tn6Ofc1Tf6VJwf7ggHCa1icLcF6tq8pmVkY5JTQEhJaC5qq-lwTriVlqCJTC-JgUbSgxay_k4Xzdy99UHR-wMesq4cGOUBTXdRvAxbCQ5QUplMqaY2yeN3SXjt2OtIo-fXjxHDdigwRAUStN8nPG8QBeWl2t4gC7IX4avl07sgVRMrkgdR6wB27UiYomv0FJ-rh4HKFHpYCXl25gdnhTWl0vA",
  //     "access_token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyJ9..0hWBmSm1iujL7J7y.n_Ak5E0j_1ZD7em5IXw4SSDMKWJXa5JZwwbie2g-4qkCESXj_EupyVu73oHZwtv_zpAlarZuclh8ga63bOrNcP_OtCYdji9t--9D0uNDFxDF5aivwnQVxmVQ3QxY_LSSPDPXXxNl09fpRdZEBk60KFldRuNf2XG3xb83hW_HqlIBiPF3-Lt0zyqFlhDclp88EGnjEGeg0MHEDZ5zKs2LQ9TVbbRPTozqI_PQAKQhyHmx5cPjDQfDwDHRUD3HKv5K8IBf5WVJWvMtz4YCGzQgIluOzOy6hxKRd3RbXprm2p_-2171ng.e6xy5wZz4iJZH3rOkHgpVQ",
  //     "raw": {
  //       "access_token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyJ9..0hWBmSm1iujL7J7y.n_Ak5E0j_1ZD7em5IXw4SSDMKWJXa5JZwwbie2g-4qkCESXj_EupyVu73oHZwtv_zpAlarZuclh8ga63bOrNcP_OtCYdji9t--9D0uNDFxDF5aivwnQVxmVQ3QxY_LSSPDPXXxNl09fpRdZEBk60KFldRuNf2XG3xb83hW_HqlIBiPF3-Lt0zyqFlhDclp88EGnjEGeg0MHEDZ5zKs2LQ9TVbbRPTozqI_PQAKQhyHmx5cPjDQfDwDHRUD3HKv5K8IBf5WVJWvMtz4YCGzQgIluOzOy6hxKRd3RbXprm2p_-2171ng.e6xy5wZz4iJZH3rOkHgpVQ",
  //       "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQkRRVE5DT1RaR056SkZNRGsyUlRJME16YzNOa1ZHTlRneE1EUXdNVU01TURBeFJFVkROdyJ9.eyJnaXZlbl9uYW1lIjoiRmFyemluIiwiZmFtaWx5X25hbWUiOiJGYWxhaGF0aSIsIm5pY2tuYW1lIjoiZmFyemluLmZhbGFoYXRpIiwibmFtZSI6IkZhcnppbiBGYWxhaGF0aSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJUDFIazNZQWFwNE1LTzRRVEJ0U0FVSHVKV3F6WU5tVXQxX3piYWt3ejJVOVpWUzFLcz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTExLTE3VDA3OjE3OjU1LjE1N1oiLCJlbWFpbCI6ImZhcnppbi5mYWxhaGF0aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyIsImF1ZCI6IkFYR3dwMEUxazVzeWpYem50Q0NwSml3c2FLQWJ4QjF6IiwiaWF0IjoxNzMxODI3ODc3LCJleHAiOjE3MzE4NjM4NzcsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjQ4NTQ2NTk5NzQ3MDQ2MDg2Iiwic2lkIjoiSW8wdjVLM2h2MGdWTkRIWjJCa18wdnVxNVd0b056bjYifQ.pCMxmVEAwMjwyGDoSxs-yDGG-HdEWtVr7AqceJgeuE3ipf0DM3q_ZrxRG_nYs1H38O_0aGstpMP3FF5sWeMQDmIgiDWfLeScz1NjzBiNybUvPRBHtjnd8UpYyAXC2Tn6Ofc1Tf6VJwf7ggHCa1icLcF6tq8pmVkY5JTQEhJaC5qq-lwTriVlqCJTC-JgUbSgxay_k4Xzdy99UHR-wMesq4cGOUBTXdRvAxbCQ5QUplMqaY2yeN3SXjt2OtIo-fXjxHDdigwRAUStN8nPG8QBeWl2t4gC7IX4avl07sgVRMrkgdR6wB27UiYomv0FJ-rh4HKFHpYCXl25gdnhTWl0vA",
  //       "scope": "openid profile email",
  //       "expires_in": "86400",
  //       "token_type": "Bearer"
  //     }
  //   }

  //   id_token payload decrepted:
  //   {
  //     "given_name": "Farzin",
  //     "family_name": "Falahati",
  //     "nickname": "farzin.falahati",
  //     "name": "Farzin Falahati",
  //     "picture": "https://lh3.googleusercontent.com/a/ACg8ocIP1Hk3YAap4MKO4QTBtSAUHuJWqzYNmUt1_zbakwz2U9ZVS1Ks=s96-c",
  //     "updated_at": "2024-11-17T07:17:55.157Z",
  //     "email": "farzin.falahati@gmail.com",
  //     "email_verified": true,
  //     "iss": "https://farzin.auth0.com/",
  //     "aud": "AXGwp0E1k5syjXzntCCpJiwsaKAbxB1z",
  //     "iat": 1731827877,
  //     "exp": 1731863877,
  //     "sub": "google-oauth2|115248546599747046086",
  //     "sid": "Io0v5K3hv0gVNDHZ2Bk_0vuq5WtoNzn6"
  //   }
  //

  //   // if (!authorization) {
  //   //   return ctx.badRequest("Authorization header is missing");
  //   // }

  //   // try {
  //   //   const response = await axios.get("https://farzin.auth0.com/userinfo", {
  //   //     headers: {
  //   //       Authorization: authorization,
  //   //     },
  //   //   });

  //   //   return ctx.send(response.data);
  //   // } catch (error) {
  //   //   console.error("Error fetching user data from Auth0:", error);
  //   //   return ctx.badRequest("Failed to fetch user data");
  //   // }
  // },

  // // async handleLogout(ctx: Context) {
  // //   // Clear local storage or any stored session data
  // //   localStorage.removeItem('jwt'); // Assuming you store JWT in localStorage

  // //   // Redirect to Auth0 logout URL
  // //   const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN; // Your Auth0 domain
  // //   const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID; // Your Auth0 Client ID
  // //   const returnTo = 'http://localhost:1337'; // Redirect URL after logout

  // //   window.location.href = `https://${auth0Domain}/v2/logout?client_id=${clientId}&returnTo=${returnTo}`;
  // // };

  // async logout(ctx: Context) {
  //   // Here you could perform any session cleanup if necessary
  //   ctx.send({ message: "Logout successful" });
  // },

  // async loginCallback(ctx: Context) {
  //   // register({ strapi }: { strapi: Core.Strapi }) {
  //   const { request, response, app, originalUrl, req, res, socket, strapi } =
  //     ctx;
  //   console.log({ request });
  //   console.log({ response });
  //   console.log({ app });
  //   // console.log({ originalUrl });
  //   // console.log({ req });
  //   // console.log({ res });
  //   // console.log({ socket });
  //   console.log({ strapi });

  //   const requestQuery = ctx.request.query;
  //   console.log({ requestQuery });
  //   // console.log({ app: ctx.app });
  //   // console.log({ strapi: ctx.strapi });
  //   //  user: Data.ContentType<"plugin::users-permissions.user"> = {};

  //   // const userService = strapi.service('plugin::users-permissions.user');
  //   // userService.create()

  //   // const user = await ctx.strapi
  //   //   .query("plugin::users-permissions.user")
  //   //   .findOne({
  //   //     where: { username: requestQuery.client_id },
  //   //   });
  //   // console.log({ user });

  //   /*
  //   {
  //     "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQkRRVE5DT1RaR056SkZNRGsyUlRJME16YzNOa1ZHTlRneE1EUXdNVU01TURBeFJFVkROdyJ9.eyJnaXZlbl9uYW1lIjoiRmFyemluIiwiZmFtaWx5X25hbWUiOiJGYWxhaGF0aSIsIm5pY2tuYW1lIjoiZmFyemluLmZhbGFoYXRpIiwibmFtZSI6IkZhcnppbiBGYWxhaGF0aSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJUDFIazNZQWFwNE1LTzRRVEJ0U0FVSHVKV3F6WU5tVXQxX3piYWt3ejJVOVpWUzFLcz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTExLTE3VDA3OjE3OjU1LjE1N1oiLCJlbWFpbCI6ImZhcnppbi5mYWxhaGF0aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyIsImF1ZCI6IkFYR3dwMEUxazVzeWpYem50Q0NwSml3c2FLQWJ4QjF6IiwiaWF0IjoxNzMxODI3ODc3LCJleHAiOjE3MzE4NjM4NzcsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjQ4NTQ2NTk5NzQ3MDQ2MDg2Iiwic2lkIjoiSW8wdjVLM2h2MGdWTkRIWjJCa18wdnVxNVd0b056bjYifQ.pCMxmVEAwMjwyGDoSxs-yDGG-HdEWtVr7AqceJgeuE3ipf0DM3q_ZrxRG_nYs1H38O_0aGstpMP3FF5sWeMQDmIgiDWfLeScz1NjzBiNybUvPRBHtjnd8UpYyAXC2Tn6Ofc1Tf6VJwf7ggHCa1icLcF6tq8pmVkY5JTQEhJaC5qq-lwTriVlqCJTC-JgUbSgxay_k4Xzdy99UHR-wMesq4cGOUBTXdRvAxbCQ5QUplMqaY2yeN3SXjt2OtIo-fXjxHDdigwRAUStN8nPG8QBeWl2t4gC7IX4avl07sgVRMrkgdR6wB27UiYomv0FJ-rh4HKFHpYCXl25gdnhTWl0vA",
  //     "access_token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyJ9..0hWBmSm1iujL7J7y.n_Ak5E0j_1ZD7em5IXw4SSDMKWJXa5JZwwbie2g-4qkCESXj_EupyVu73oHZwtv_zpAlarZuclh8ga63bOrNcP_OtCYdji9t--9D0uNDFxDF5aivwnQVxmVQ3QxY_LSSPDPXXxNl09fpRdZEBk60KFldRuNf2XG3xb83hW_HqlIBiPF3-Lt0zyqFlhDclp88EGnjEGeg0MHEDZ5zKs2LQ9TVbbRPTozqI_PQAKQhyHmx5cPjDQfDwDHRUD3HKv5K8IBf5WVJWvMtz4YCGzQgIluOzOy6hxKRd3RbXprm2p_-2171ng.e6xy5wZz4iJZH3rOkHgpVQ",
  //     "raw": {
  //       "access_token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyJ9..0hWBmSm1iujL7J7y.n_Ak5E0j_1ZD7em5IXw4SSDMKWJXa5JZwwbie2g-4qkCESXj_EupyVu73oHZwtv_zpAlarZuclh8ga63bOrNcP_OtCYdji9t--9D0uNDFxDF5aivwnQVxmVQ3QxY_LSSPDPXXxNl09fpRdZEBk60KFldRuNf2XG3xb83hW_HqlIBiPF3-Lt0zyqFlhDclp88EGnjEGeg0MHEDZ5zKs2LQ9TVbbRPTozqI_PQAKQhyHmx5cPjDQfDwDHRUD3HKv5K8IBf5WVJWvMtz4YCGzQgIluOzOy6hxKRd3RbXprm2p_-2171ng.e6xy5wZz4iJZH3rOkHgpVQ",
  //       "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQkRRVE5DT1RaR056SkZNRGsyUlRJME16YzNOa1ZHTlRneE1EUXdNVU01TURBeFJFVkROdyJ9.eyJnaXZlbl9uYW1lIjoiRmFyemluIiwiZmFtaWx5X25hbWUiOiJGYWxhaGF0aSIsIm5pY2tuYW1lIjoiZmFyemluLmZhbGFoYXRpIiwibmFtZSI6IkZhcnppbiBGYWxhaGF0aSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJUDFIazNZQWFwNE1LTzRRVEJ0U0FVSHVKV3F6WU5tVXQxX3piYWt3ejJVOVpWUzFLcz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTExLTE3VDA3OjE3OjU1LjE1N1oiLCJlbWFpbCI6ImZhcnppbi5mYWxhaGF0aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyIsImF1ZCI6IkFYR3dwMEUxazVzeWpYem50Q0NwSml3c2FLQWJ4QjF6IiwiaWF0IjoxNzMxODI3ODc3LCJleHAiOjE3MzE4NjM4NzcsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjQ4NTQ2NTk5NzQ3MDQ2MDg2Iiwic2lkIjoiSW8wdjVLM2h2MGdWTkRIWjJCa18wdnVxNVd0b056bjYifQ.pCMxmVEAwMjwyGDoSxs-yDGG-HdEWtVr7AqceJgeuE3ipf0DM3q_ZrxRG_nYs1H38O_0aGstpMP3FF5sWeMQDmIgiDWfLeScz1NjzBiNybUvPRBHtjnd8UpYyAXC2Tn6Ofc1Tf6VJwf7ggHCa1icLcF6tq8pmVkY5JTQEhJaC5qq-lwTriVlqCJTC-JgUbSgxay_k4Xzdy99UHR-wMesq4cGOUBTXdRvAxbCQ5QUplMqaY2yeN3SXjt2OtIo-fXjxHDdigwRAUStN8nPG8QBeWl2t4gC7IX4avl07sgVRMrkgdR6wB27UiYomv0FJ-rh4HKFHpYCXl25gdnhTWl0vA",
  //       "scope": "openid profile email",
  //       "expires_in": "86400",
  //       "token_type": "Bearer"
  //     }
  //   }

  //   id_token payload decrepted:
  //   {
  //     "given_name": "Farzin",
  //     "family_name": "Falahati",
  //     "nickname": "farzin.falahati",
  //     "name": "Farzin Falahati",
  //     "picture": "https://lh3.googleusercontent.com/a/ACg8ocIP1Hk3YAap4MKO4QTBtSAUHuJWqzYNmUt1_zbakwz2U9ZVS1Ks=s96-c",
  //     "updated_at": "2024-11-17T07:17:55.157Z",
  //     "email": "farzin.falahati@gmail.com",
  //     "email_verified": true,
  //     "iss": "https://farzin.auth0.com/",
  //     "aud": "AXGwp0E1k5syjXzntCCpJiwsaKAbxB1z",
  //     "iat": 1731827877,
  //     "exp": 1731863877,
  //     "sub": "google-oauth2|115248546599747046086",
  //     "sid": "Io0v5K3hv0gVNDHZ2Bk_0vuq5WtoNzn6"
  //   }
  //   */
  //   // Core.CoreAPI;

  //   // const { identifier, password } = ctx.request.body;

  //   // if (!identifier || !password) {
  //   //   return ctx.badRequest('Identifier and password are required');
  //   // }

  //   try {
  //     // Authenticate with Strapi
  //     // const response = await axios.post(
  //     //   `http://localhost:1337/api/auth/local`,
  //     //   {
  //     //     identifier,
  //     //     password,
  //     //   }
  //     // );
  //     // const { jwt } = response.data;
  //     // // Set JWT as a cookie
  //     // ctx.cookies.set("jwt", jwt, {
  //     //   httpOnly: true,
  //     //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  //     //   maxAge: 1000 * 60 * 60 * 24, // 1 day
  //     //   sameSite: "lax",
  //     // });
  //     // ctx.send({
  //     //   message: "Login successful",
  //     //   user: response.data.user,
  //     // });
  //     ctx.send(requestQuery);
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     return ctx.badRequest("Invalid credentials");
  //   }
  // },

  // async logoutCallback(ctx: Context) {
  //   ctx.cookies.set("jwt", "", { expires: new Date(0) }); // Clear the cookie
  //   ctx.send({ message: "Logout successful" });
  // },
});

// import { factories } from "@strapi/strapi";

// export default factories.createCoreController(
//   "api::auth.auth",
//   ({ strapi }) => ({
//     // Method to create a new message
//     async create(ctx) {
//       console.log({ body: ctx.request.body });
//       const { content, senderId, recipientId } = ctx.request.body;

//       try {
//         const message = await strapi
//           .service("api::message.message")
//           .sendMessage(content, senderId, recipientId);
//         return ctx.created(message);
//       } catch (error) {
//         return ctx.badRequest(error.message);
//       }
//     },

//     // Method to delete a message by ID
//     async delete(ctx) {
//       const { id } = ctx.params;

//       try {
//         const response = await strapi
//           .service("api::message.message")
//           .deleteMessage(id);
//         return ctx.send(response);
//       } catch (error) {
//         return ctx.notFound(error.message);
//       }
//     },

//     // Method to find messages for a user
//     async find(ctx) {
//       const { userId } = ctx.query;

//       try {
//         const messages = await strapi
//           .service("api::message.message")
//           .findMessagesForUser(userId);
//         return ctx.send(messages);
//       } catch (error) {
//         return ctx.internalServerError(error.message);
//       }
//     },

//     async loginCallback(ctx: any) {
//       // register({ strapi }: { strapi: Core.Strapi }) {
//       const { request, response, app, originalUrl, req, res, socket, strapi } =
//         ctx;
//       console.log({ request });
//       console.log({ response });
//       console.log({ app });
//       // console.log({ originalUrl });
//       // console.log({ req });
//       // console.log({ res });
//       // console.log({ socket });
//       console.log({ strapi });

//       const requestQuery = ctx.request.query;
//       console.log({ requestQuery });
//       // console.log({ app: ctx.app });
//       // console.log({ strapi: ctx.strapi });
//       //  user: Data.ContentType<"plugin::users-permissions.user"> = {};

//       // const userService = strapi.service('plugin::users-permissions.user');
//       // userService.create()

//       // const user = await ctx.strapi
//       //   .query("plugin::users-permissions.user")
//       //   .findOne({
//       //     where: { username: requestQuery.client_id },
//       //   });
//       // console.log({ user });

//       /*
//     {
//       "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQkRRVE5DT1RaR056SkZNRGsyUlRJME16YzNOa1ZHTlRneE1EUXdNVU01TURBeFJFVkROdyJ9.eyJnaXZlbl9uYW1lIjoiRmFyemluIiwiZmFtaWx5X25hbWUiOiJGYWxhaGF0aSIsIm5pY2tuYW1lIjoiZmFyemluLmZhbGFoYXRpIiwibmFtZSI6IkZhcnppbiBGYWxhaGF0aSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJUDFIazNZQWFwNE1LTzRRVEJ0U0FVSHVKV3F6WU5tVXQxX3piYWt3ejJVOVpWUzFLcz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTExLTE3VDA3OjE3OjU1LjE1N1oiLCJlbWFpbCI6ImZhcnppbi5mYWxhaGF0aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyIsImF1ZCI6IkFYR3dwMEUxazVzeWpYem50Q0NwSml3c2FLQWJ4QjF6IiwiaWF0IjoxNzMxODI3ODc3LCJleHAiOjE3MzE4NjM4NzcsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjQ4NTQ2NTk5NzQ3MDQ2MDg2Iiwic2lkIjoiSW8wdjVLM2h2MGdWTkRIWjJCa18wdnVxNVd0b056bjYifQ.pCMxmVEAwMjwyGDoSxs-yDGG-HdEWtVr7AqceJgeuE3ipf0DM3q_ZrxRG_nYs1H38O_0aGstpMP3FF5sWeMQDmIgiDWfLeScz1NjzBiNybUvPRBHtjnd8UpYyAXC2Tn6Ofc1Tf6VJwf7ggHCa1icLcF6tq8pmVkY5JTQEhJaC5qq-lwTriVlqCJTC-JgUbSgxay_k4Xzdy99UHR-wMesq4cGOUBTXdRvAxbCQ5QUplMqaY2yeN3SXjt2OtIo-fXjxHDdigwRAUStN8nPG8QBeWl2t4gC7IX4avl07sgVRMrkgdR6wB27UiYomv0FJ-rh4HKFHpYCXl25gdnhTWl0vA",
//       "access_token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyJ9..0hWBmSm1iujL7J7y.n_Ak5E0j_1ZD7em5IXw4SSDMKWJXa5JZwwbie2g-4qkCESXj_EupyVu73oHZwtv_zpAlarZuclh8ga63bOrNcP_OtCYdji9t--9D0uNDFxDF5aivwnQVxmVQ3QxY_LSSPDPXXxNl09fpRdZEBk60KFldRuNf2XG3xb83hW_HqlIBiPF3-Lt0zyqFlhDclp88EGnjEGeg0MHEDZ5zKs2LQ9TVbbRPTozqI_PQAKQhyHmx5cPjDQfDwDHRUD3HKv5K8IBf5WVJWvMtz4YCGzQgIluOzOy6hxKRd3RbXprm2p_-2171ng.e6xy5wZz4iJZH3rOkHgpVQ",
//       "raw": {
//         "access_token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyJ9..0hWBmSm1iujL7J7y.n_Ak5E0j_1ZD7em5IXw4SSDMKWJXa5JZwwbie2g-4qkCESXj_EupyVu73oHZwtv_zpAlarZuclh8ga63bOrNcP_OtCYdji9t--9D0uNDFxDF5aivwnQVxmVQ3QxY_LSSPDPXXxNl09fpRdZEBk60KFldRuNf2XG3xb83hW_HqlIBiPF3-Lt0zyqFlhDclp88EGnjEGeg0MHEDZ5zKs2LQ9TVbbRPTozqI_PQAKQhyHmx5cPjDQfDwDHRUD3HKv5K8IBf5WVJWvMtz4YCGzQgIluOzOy6hxKRd3RbXprm2p_-2171ng.e6xy5wZz4iJZH3rOkHgpVQ",
//         "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5EQkRRVE5DT1RaR056SkZNRGsyUlRJME16YzNOa1ZHTlRneE1EUXdNVU01TURBeFJFVkROdyJ9.eyJnaXZlbl9uYW1lIjoiRmFyemluIiwiZmFtaWx5X25hbWUiOiJGYWxhaGF0aSIsIm5pY2tuYW1lIjoiZmFyemluLmZhbGFoYXRpIiwibmFtZSI6IkZhcnppbiBGYWxhaGF0aSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJUDFIazNZQWFwNE1LTzRRVEJ0U0FVSHVKV3F6WU5tVXQxX3piYWt3ejJVOVpWUzFLcz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTExLTE3VDA3OjE3OjU1LjE1N1oiLCJlbWFpbCI6ImZhcnppbi5mYWxhaGF0aUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9mYXJ6aW4uYXV0aDAuY29tLyIsImF1ZCI6IkFYR3dwMEUxazVzeWpYem50Q0NwSml3c2FLQWJ4QjF6IiwiaWF0IjoxNzMxODI3ODc3LCJleHAiOjE3MzE4NjM4NzcsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjQ4NTQ2NTk5NzQ3MDQ2MDg2Iiwic2lkIjoiSW8wdjVLM2h2MGdWTkRIWjJCa18wdnVxNVd0b056bjYifQ.pCMxmVEAwMjwyGDoSxs-yDGG-HdEWtVr7AqceJgeuE3ipf0DM3q_ZrxRG_nYs1H38O_0aGstpMP3FF5sWeMQDmIgiDWfLeScz1NjzBiNybUvPRBHtjnd8UpYyAXC2Tn6Ofc1Tf6VJwf7ggHCa1icLcF6tq8pmVkY5JTQEhJaC5qq-lwTriVlqCJTC-JgUbSgxay_k4Xzdy99UHR-wMesq4cGOUBTXdRvAxbCQ5QUplMqaY2yeN3SXjt2OtIo-fXjxHDdigwRAUStN8nPG8QBeWl2t4gC7IX4avl07sgVRMrkgdR6wB27UiYomv0FJ-rh4HKFHpYCXl25gdnhTWl0vA",
//         "scope": "openid profile email",
//         "expires_in": "86400",
//         "token_type": "Bearer"
//       }
//     }

//     id_token payload decrepted:
//     {
//       "given_name": "Farzin",
//       "family_name": "Falahati",
//       "nickname": "farzin.falahati",
//       "name": "Farzin Falahati",
//       "picture": "https://lh3.googleusercontent.com/a/ACg8ocIP1Hk3YAap4MKO4QTBtSAUHuJWqzYNmUt1_zbakwz2U9ZVS1Ks=s96-c",
//       "updated_at": "2024-11-17T07:17:55.157Z",
//       "email": "farzin.falahati@gmail.com",
//       "email_verified": true,
//       "iss": "https://farzin.auth0.com/",
//       "aud": "AXGwp0E1k5syjXzntCCpJiwsaKAbxB1z",
//       "iat": 1731827877,
//       "exp": 1731863877,
//       "sub": "google-oauth2|115248546599747046086",
//       "sid": "Io0v5K3hv0gVNDHZ2Bk_0vuq5WtoNzn6"
//     }
//     */
//       // Core.CoreAPI;

//       // const { identifier, password } = ctx.request.body;

//       // if (!identifier || !password) {
//       //   return ctx.badRequest('Identifier and password are required');
//       // }

//       try {
//         // Authenticate with Strapi
//         // const response = await axios.post(
//         //   `http://localhost:1337/api/auth/local`,
//         //   {
//         //     identifier,
//         //     password,
//         //   }
//         // );
//         // const { jwt } = response.data;
//         // // Set JWT as a cookie
//         // ctx.cookies.set("jwt", jwt, {
//         //   httpOnly: true,
//         //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//         //   maxAge: 1000 * 60 * 60 * 24, // 1 day
//         //   sameSite: "lax",
//         // });
//         // ctx.send({
//         //   message: "Login successful",
//         //   user: response.data.user,
//         // });
//         ctx.send(requestQuery);
//       } catch (error) {
//         console.error("Login error:", error);
//         return ctx.badRequest("Invalid credentials");
//       }
//     },

//     async logoutCallback(ctx: Context) {
//       ctx.cookies.set("jwt", "", { expires: new Date(0) }); // Clear the cookie
//       ctx.send({ message: "Logout successful" });
//     },
//   })
// );
