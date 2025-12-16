import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from 'mongoose'

export interface Iblog {
  title: string,
  description: string,
  imageUrl: string,
  user: string | mongoose.Types.ObjectId
}

export const blogSchema = defineMongooseModel<Iblog>("Blog", {
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
