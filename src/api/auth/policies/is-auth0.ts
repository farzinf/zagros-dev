import { Core } from "@strapi/strapi";

export default async (
  policyContext,
  config,
  { strapi }: { strapi: Core.Strapi }
) => {
  try {
    // TODO: just valid when auth0 called
    // console.log(" -------- AUTH - IS AUTH0 POLICY -----  ) ");
    return true;
  } catch (error) {
    return false;
  }
};
