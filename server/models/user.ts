import { defineMongooseModel } from "#nuxt/mongoose";

export interface Iuser {
  name: string,
  email: string,
  password: string,
  isActive: boolean
}

export const userSchema = defineMongooseModel<Iuser>(
  "User",
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean
    }
  },
  { timestamps: true }
);
