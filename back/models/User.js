import { EntitySchema, JoinColumn } from "typeorm";
import TemplatePage from "./TemplatePage.js";


const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    firstname: {
      type: "varchar",
      unique: true,
    },
    lastname: {
      type: "varchar",
      unique: true,
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
  },
  relations: {
    TemplatePage: {
      type: "one-to-many",
      target: "TemplatePage",
      inverseSide: "user",
      cascade: true,
    },
  },
});

export default User;