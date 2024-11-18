import { Core } from "@strapi/strapi";
import { Context } from "koa";

export type PolicyContext = Context & {
  state: {
    user?: any;
    route: {};
  };
};

export default async (
  policyContext: PolicyContext,
  config,
  { strapi }: { strapi: Core.Strapi }
) => {
  if (policyContext.state.user) {
    return true;
  }
  return false;
};
