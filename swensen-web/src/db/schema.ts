import { pgTable, serial, text, integer, varchar, pgEnum } from "drizzle-orm/pg-core";

export const enum_contentTypes = pgEnum("content_type", ["quest", "skill_level", "activity", "item"]);
export const enum_requirementTypes = pgEnum("requirement_type", ["requirement", "recommendation", "optional"]);

// Define the "content" table
// This table stores different types of content, such as quests, skill levels, activities, and items.
export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  type: enum_contentTypes("type").notNull(),    
  name: varchar("name", { length: 100 }).notNull().unique(),
  displayName: varchar("display_name", { length: 255 }).notNull(),
  description: text("description"),
  difficulty: integer("difficulty"),
});

// Define the "requirements" table
// This table stores the requirements for each content item, linking them to other content items.
export const requirements = pgTable("requirements", {
    id: serial("id").primaryKey(),
    contentId: integer("content_id").notNull().references(() => content.id),
    requirementType: enum_requirementTypes("requirement_type").notNull(),
    requiredContentId: integer("required_content_id").notNull().references(() => content.id),
    description: text("description"),
});