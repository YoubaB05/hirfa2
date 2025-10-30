import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nameEn: text("name_en").notNull(),
  nameFr: text("name_fr").notNull(),
  nameAr: text("name_ar").notNull(),
  descriptionEn: text("description_en"),
  descriptionFr: text("description_fr"),
  descriptionAr: text("description_ar"),
  icon: text("icon").notNull(),
});

export const artisans = pgTable("artisans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nameEn: text("name_en").notNull(),
  nameFr: text("name_fr").notNull(),
  nameAr: text("name_ar").notNull(),
  categoryId: varchar("category_id").notNull(),
  bioEn: text("bio_en").notNull(),
  bioFr: text("bio_fr").notNull(),
  bioAr: text("bio_ar").notNull(),
  servicesEn: text("services_en").array().notNull(),
  servicesFr: text("services_fr").array().notNull(),
  servicesAr: text("services_ar").array().notNull(),
  location: text("location").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  priceRange: text("price_range").notNull(),
  rating: real("rating").notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),
  profileImage: text("profile_image").notNull(),
  portfolioImages: text("portfolio_images").array().notNull().default(sql`ARRAY[]::text[]`),
  featured: integer("featured").notNull().default(0),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  artisanId: varchar("artisan_id").notNull(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientPhone: text("client_phone"),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertArtisanSchema = createInsertSchema(artisans).omit({
  id: true,
  rating: true,
  reviewCount: true,
  featured: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Artisan = typeof artisans.$inferSelect;
export type InsertArtisan = z.infer<typeof insertArtisanSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
