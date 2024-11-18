// export default async (ctx, config, { strapi }) => {
//   if (ctx.state.user) {
//     return true;
//   }
//   return false;
// };
// import { Strapi } from "@strapi/strapi";

// interface PolicyContext {
//   state: {
//     user?: any;
//   };
// }

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

export default (policyContext, config, { strapi }) => {
  console.log({ isAuth: "step1" });
  if (policyContext.state.user.role.code === config.role) {
    // if user's role is the same as the one described in configuration
    return true;
  }

  return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass
};
