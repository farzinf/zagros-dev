// declare module "@strapi/strapi" {
//   export interface Strapi {
//     // Add custom type definitions
//   }
// }

import { DefaultContext } from "koa";
import { Strapi } from "@strapi/strapi";

// Extend the DefaultContext to include the Strapi instance
declare module "koa" {
  interface DefaultContext {
    strapi: Strapi; // Add Strapi instance
    // You can add more properties here if needed
  }
}
