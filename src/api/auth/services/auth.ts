import { Core, factories } from "@strapi/strapi";
import jwt from "jsonwebtoken";

type AuthIdTokenPayload = {
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

// export default factories.createCoreService("api::auth.auth", ({ strapi }) => ({
//   async decodeIdToken(tokenId: string) {
//     // if (!tokenId) {
//     //   return ctx.badRequest("id_token is required");
//     // }

//     try {
//       // Decode the tokenId without verification
//       const decoded = jwt.decode(tokenId);

//       // Optionally verify the token if you have the public key or secret
//       // const verified = jwt.verify(id_token, process.env.AUTH0_PUBLIC_KEY); // Uncomment if needed

//       return decoded;
//     } catch (error) {
//       console.error("Error decoding id_token:", error);
//     }
//   },

//   async loginCallbackHandler(user: any /*PluginUsersPermissionsUser*/) {
//     // if (!tokenId) {
//     //   return ctx.badRequest("id_token is required");
//     // }

//     try {
//       // Decode the tokenId without verification
//       // const decoded = jwt.decode(tokenId);
//       // // Optionally verify the token if you have the public key or secret
//       // const verified = jwt.verify(id_token, process.env.AUTH0_PUBLIC_KEY); // Uncomment if needed
//       // return decoded;
//     } catch (error) {
//       // console.error("Error decoding id_token:", error);
//       // return ctx.internalServerError("Failed to decode id_token");
//     }
//   },

//   async logoutCallbackHandler(user: any /*PluginUsersPermissionsUser*/) {
//     // if (!tokenId) {
//     //   return ctx.badRequest("id_token is required");
//     // }

//     try {
//       // Decode the tokenId without verification
//       // const decoded = jwt.decode(tokenId);
//       // // Optionally verify the token if you have the public key or secret
//       // const verified = jwt.verify(id_token, process.env.AUTH0_PUBLIC_KEY); // Uncomment if needed
//       // return decoded;
//     } catch (error) {
//       // console.error("Error decoding id_token:", error);
//       // return ctx.internalServerError("Failed to decode id_token");
//     }
//   },
// }));
// const verifyIdToken = (token: string): AuthIdTokenPayload => {
//   // if (!token) {
//   //   return ctx.badRequest("id_token is required");
//   // }

//   // try {
//   // Decode the token without verification
//   const decoded = jwt.decode(token) as AuthIdTokenPayload;
//   console.log({ decoded });
//   // id_token payload decrepted:
//   // {
//   //   "given_name": "Farzin",
//   //   "family_name": "Falahati",
//   //   "nickname": "farzin.falahati",
//   //   "name": "Farzin Falahati",
//   //   "picture": "https://lh3.googleusercontent.com/a/ACg8ocIP1Hk3YAap4MKO4QTBtSAUHuJWqzYNmUt1_zbakwz2U9ZVS1Ks=s96-c",
//   //   "updated_at": "2024-11-17T07:17:55.157Z",
//   //   "email": "farzin.falahati@gmail.com",
//   //   "email_verified": true,
//   //   "iss": "https://farzin.auth0.com/",
//   //   "aud": "AXGwp0E1k5syjXzntCCpJiwsaKAbxB1z",
//   //   "iat": 1731827877,
//   //   "exp": 1731863877,
//   //   "sub": "google-oauth2|115248546599747046086",
//   //   "sid": "Io0v5K3hv0gVNDHZ2Bk_0vuq5WtoNzn6"
//   // }

//   // Optionally verify the token if you have the public key or secret
//   const verified = jwt.verify(token, process.env.JWT_SECRET); // Uncomment if needed

//   return decoded;
//   // } catch (error) {
//   //   console.error("Error decoding id_token:", error);
//   //   // return ctx.internalServerError("Failed to decode id_token");
//   // }
// };
export default (strapi: Core.Strapi) => ({
  // loginCallback: async (ctx: any) => {
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

  async loginCallbackHandler() {
    console.log("services loginCallbackHandler BEGIN");
    // const decoded = jwt.decode(token) as AuthIdTokenPayload;
    // console.log({ decoded });
    // id_token payload decrepted:
    // {
    //   "given_name": "Farzin",
    //   "family_name": "Falahati",
    //   "nickname": "farzin.falahati",
    //   "name": "Farzin Falahati",
    //   "picture": "https://lh3.googleusercontent.com/a/ACg8ocIP1Hk3YAap4MKO4QTBtSAUHuJWqzYNmUt1_zbakwz2U9ZVS1Ks=s96-c",
    //   "updated_at": "2024-11-17T07:17:55.157Z",
    //   "email": "farzin.falahati@gmail.com",
    //   "email_verified": true,
    //   "iss": "https://farzin.auth0.com/",
    //   "aud": "AXGwp0E1k5syjXzntCCpJiwsaKAbxB1z",
    //   "iat": 1731827877,
    //   "exp": 1731863877,
    //   "sub": "google-oauth2|115248546599747046086",
    //   "sid": "Io0v5K3hv0gVNDHZ2Bk_0vuq5WtoNzn6"
    // }

    // Optionally verify the token if you have the public key or secret
    // const verified = jwt.verify(token, process.env.JWT_SECRET); // Uncomment if needed
    // const requestQuery = ctx.request.query;
    // console.log({ requestQuery });

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
      // ctx.send(requestQuery);
    } catch (error) {
      console.error("Login error:", error);
      // return ctx.badRequest("Invalid credentials");
    }
  },

  async logoutCallback() {
    console.log("services logoutCallback BEGIN");
    // ctx.cookies.set("jwt", "", { expires: new Date(0) }); // Clear the cookie
    // ctx.send({ message: "Logout successful" });
  },
});