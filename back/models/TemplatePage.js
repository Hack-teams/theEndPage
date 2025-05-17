import { EntitySchema } from "typeorm";
import User from "./User.js";

const TemplatePage = new EntitySchema({
  name: "TemplatePage",
  tableName: "Template_pages",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    title: {
      type: "text",
    },
    message: {
      type: "text",
    },
    tone: {
      type: "text",
      nullable: true,
    },
    theme: {
      type: "text",
      nullable: true,
    },
    gif_url: {
      type: "text",
      nullable: true,
    },
    image_url: {
      type: "text",
      nullable: true,
    },
    music_url: {
      type: "text",
      nullable: true,
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
  },
      user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      eager: true,
      nullable: false,
      onDelete: "CASCADE",
    },
});

export default TemplatePage;
