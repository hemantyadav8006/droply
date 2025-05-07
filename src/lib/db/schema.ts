import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),

  // basic file/folder information
  name: text("name").notNull(),
  path: text("path").notNull(), // /document/folder/files
  size: integer("size").notNull(),
  type: text("type").notNull(), // folder

  // storage information
  fileUrl: text("file_url").notNull(), // url to access file
  thumbnailUrl: text("thumbnail_url"),

  // Ownership information
  userId: text("user_id").notNull(),
  parentId: uuid("parent_id"), // parent folder id if(null for root items)

  // file/folder flags
  isFolder: boolean("is_folder").default(false).notNull(),
  isStarred: boolean("is_starred").default(false).notNull(),
  isTrash: boolean("is_trashed").default(false).notNull(),

  // timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/*
parent: Each file/folder can have one parent folder.
children: Rach folder can have many child file/folder.
*/
export const filesRelations = relations(files, ({ one, many }) => ({
  parent: one(files, {
    fields: [files.parentId],
    references: [files.id],
  }),

  // relationship to child files/folder
  childeren: many(files),
}));

// type definations
export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferInsert;
