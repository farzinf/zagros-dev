import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::message.message",
  ({ strapi }) => ({
    // Custom method to send a message
    async sendMessage(content: string, senderId: number, recipientId: number) {
      // Validate input
      if (!content || !senderId || !recipientId) {
        throw new Error("Content, senderId, and recipientId are required");
      }

      // Create a new message
      const message = await strapi.entityService.create(
        "api::message.message",
        {
          data: {
            content,
            sender: senderId,
            recipient: recipientId,
          },
        }
      );

      return message;
    },

    // Custom method to find messages for a user
    async findMessagesForUser(userId: number) {
      const messages = await strapi.entityService.findMany(
        "api::message.message",
        {
          // filters: {
          //   or: [{ sender: userId }, { recipient: userId }],
          // },
          // populate: ["sender", "recipient"],
        }
      );

      return messages;
    },

    // Custom method to delete a message by ID
    async deleteMessage(id: number) {
      // Check if the message exists
      const message = await strapi.entityService.findOne(
        "api::message.message",
        id
      );
      if (!message) {
        throw new Error("Message not found");
      }

      // Delete the message
      await strapi.entityService.delete("api::message.message", id);

      return { message: "Message deleted successfully" };
    },
  })
);
