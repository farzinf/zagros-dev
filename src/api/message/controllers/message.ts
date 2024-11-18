import { factories } from "@strapi/strapi";
import { PolicyContext } from "../../auth/policies/is-authenticated";

export default factories.createCoreController(
  "api::message.message",
  ({ strapi }) => ({
    // Method to create a new message
    async create(ctx: PolicyContext) {
      console.log({ body: ctx.request.body });
      console.log({ user: ctx.state.user });
      const { content, recipientId } = ctx.request.body;

      try {
        const message = await strapi
          .service("api::message.message")
          .sendMessage(content, ctx.state.user.id, recipientId);
        return ctx.created(message);
      } catch (error) {
        return ctx.badRequest(error.message);
      }
    },

    // Method to delete a message by ID
    async delete(ctx: PolicyContext) {
      const { id } = ctx.params;

      try {
        const response = await strapi
          .service("api::message.message")
          .deleteMessage(id);
        return ctx.send(response);
      } catch (error) {
        return ctx.notFound(error.message);
      }
    },

    // Method to find messages for a user
    async find(ctx: PolicyContext) {
      const { userId } = ctx.query;

      try {
        const messages = await strapi
          .service("api::message.message")
          .findMessagesForUser(userId);
        return ctx.send(messages);
      } catch (error) {
        return ctx.internalServerError(error.message);
      }
    },
  })
);
