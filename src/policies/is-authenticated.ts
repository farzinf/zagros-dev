import { PolicyContext } from "../api/auth/policies/is-authenticated";

export default async (policyContext: PolicyContext) => {
  if (policyContext.state.user) {
    return true;
  }
  return false;
};
