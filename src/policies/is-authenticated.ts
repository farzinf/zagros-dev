// 'use strict';

// module.exports = async (policyContext, config, { strapi }) => {
//   if (policyContext.state.user) {
//     return true;
//   }

//   return false;
// };
// import { Strapi } from "@strapi/strapi";
// import { StrapiContext } from "../api/message/types";

// export default (
//   policyContext: StrapiContext,
//   config: any,
//   { strapi }: { strapi: Strapi }
// ) => {
//   if (policyContext.state.user) {
//     return true;
//   }
//   return false;
// };

// import { verify } from 'jsonwebtoken';

// export default async (ctx, config, { strapi }) => {
//   try {
//     const token = ctx.request.header.authorization?.replace('Bearer ', '');
//     if (!token) {
//       return false;
//     }

//     const decoded = verify(token, process.env.JWT_SECRET);
//     const user = await strapi.query('plugin::users-permissions.user').findOne({
//       where: { id: decoded.id }
//     });

//     if (!user) {
//       return false;
//     }

//     ctx.state.user = user;
//     return true;
//   } catch (error) {
//     return false;
//   }

import { Core } from "@strapi/strapi";
import { verify } from "jsonwebtoken";

export default async (
  policyContext,
  config,
  { strapi }: { strapi: Core.Strapi }
) => {
  // if (policyContext.state.user) {
  //   // if a session is open
  //   // go to next policy or reach the controller's action
  //   return true;
  // }

  // return false; // If you return nothing, Strapi considers you didn't want to block the request and will let it pass

  try {
    const authHeaders = policyContext.request.header.authorization;
    console.log({ authHeaders });
    if (policyContext.request.header.authorization) {
      const token = policyContext.request.header.authorization?.replace(
        "Bearer ",
        ""
      );
      // if (!token) {
      //   return false;
      // }
      console.log({ token });

      const decoded = verify(token, process.env.JWT_SECRET);
      // const user = await strapi.query("plugin::users-permissions.user").findOne({
      //   where: { id: decoded.id },
      // });
    }

    // if (!user) {
    //   return false;
    // }

    // policyContext.state.user = user;
    return true;
  } catch (error) {
    return false;
  }
};
