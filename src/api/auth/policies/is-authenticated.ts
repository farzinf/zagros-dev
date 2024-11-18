// export default async (ctx, config, { strapi }) => {
//   if (ctx.state.user) {
//     return true;
//   }
//   return false;
// };
// import { Strapi } from "@strapi/strapi";

import { Core } from "@strapi/strapi";
import { Context } from "koa";
import jwt from "jsonwebtoken";
import { Auth0IdTokenPayload } from "../controllers/auth";

export type PolicyContext = Context & {
  state: {
    user?: any;
    route: {};
  };
};

// export default (
//   policyContext: PolicyContext,
//   config: any,
//   { strapi }: { strapi: Strapi }
// ) => {
//   if (policyContext.state.user) {
//     return true;
//   }

//   return false;
// };

export default async (
  policyContext: PolicyContext,
  config,
  { strapi }: { strapi: Core.Strapi }
) => {
  console.log({
    "is-authenticated": "step1",
  });
  // policyContext.
  console.log({
    "is-authenticated": "step2",
    // policyContext,
    state: policyContext.state,
    // req: policyContext.req,
    // router: policyContext.router,
    user: policyContext.state.user,
    route: policyContext.state.route,
    // role: policyContext.state.user.role,
    // code: policyContext.state.user.role.code,
  });
  // // const authorizationHeader = policyContext.req.headers["authorization"];
  // if (!authorizationHeader) {
  //   return;
  // }
  // const token = authorizationHeader.replace("Bearer ", "");

  // const idTokenPayload = jwt.decode(token) as Auth0IdTokenPayload;
  // // console.log({ idTokenPayload })

  // let user = await strapi.query("plugin::users-permissions.user").findOne({
  //   where: { username: idTokenPayload.sid },
  //   populate: {},
  // });

  // console.log({
  //   "is-authenticated": "step3",
  //   // authorizationHeader,
  //   idTokenPayload,
  //   user,
  // });
  // policyContext.state.user = user;
  if (policyContext.state.user.role.code === config.role) {
    // if user's role is the same as the one described in configuration
    return true;
  }

  // return true;
  return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
