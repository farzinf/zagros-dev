// import { User } from "@strapi/strapi";
// import * as Strapi from '@strapi/strapi';
// const User = Strapi.User;

// import { Strapi } from "@strapi/strapi";
// Strapi.

import { Data } from "@strapi/strapi";
// type User = Data.ContentType<"admin::user">;
// type User = Shared.ContentTypes['api::user.user']['attributes'];

export interface MessageEntity {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // user: User;
}

export interface CreateMessageInput {
  title: string;
  content: string;
}

export interface StrapiContext {
  state: {
    // user: User;
  };
  request: {
    body: any;
  };
  params: {
    id?: string;
  };
  badRequest: (message: string) => void;
  notFound: (message: string) => void;
  forbidden: (message: string) => void;
}
