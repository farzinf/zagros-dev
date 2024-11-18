import { Context } from "koa";
import { Core } from "@strapi/strapi";
import jwt from "jsonwebtoken";
import { PolicyContext } from "../policies/is-authenticated";

export type Auth0IdTokenPayload = {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: Date;
  email: string;
  email_verified: boolean;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  sub: string;
  sid: string;
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

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  loginCallback: async (ctx: Context) => {
    const { id_token } = ctx.request.query as LoginCallbackParamsType;
    if (!id_token) {
      return ctx.send({ error: true, message: "id_token not found!" });
    }

    const idTokenPayload = jwt.decode(id_token) as Auth0IdTokenPayload;
    let user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { username: idTokenPayload.sid },
    });

    if (!user) {
      const role = await strapi
        .query("plugin::users-permissions.role")
        .findOne({
          where: { type: strapi.config.defaultRole || "authenticated" },
        });

      user = await strapi.query("plugin::users-permissions.user").create({
        data: {
          username: idTokenPayload.sid,
          email: idTokenPayload.email,
          provider: "auth0",
          confirmed: true,
          blocked: false,
          role: role.id,
        },
      });
    }

    try {
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
      const token = jwt.sign(
        {
          id: user.id,
        },
        strapi.config.get("plugin::users-permissions.jwtSecret")
      );
      ctx.send({ token });
    } catch (error) {
      console.error("Login error:", error);
      return ctx.badRequest("Invalid credentials");
    }
  },
  logoutCallback: async (ctx: Context) => ({}),
  status: async (ctx: PolicyContext) => {
    ctx.send({ user: ctx.state.user });
  },
});
