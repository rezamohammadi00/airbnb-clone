// user
export * from "./auth-schema";
import { user } from "./auth-schema";
// ___

import {
  integer,
  bigint,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  unique,
  date,
} from "drizzle-orm/pg-core";

// categories
export const categories = pgTable("categories", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull().unique(),
  slug: varchar().notNull().unique(),
});

export type ICategory = typeof categories.$inferSelect;

// accommodations
const DEFAULT_ACCOMMODATION_STATUS = "draft";
export const accommodationStatus = pgEnum("accommodation_status", [
  DEFAULT_ACCOMMODATION_STATUS,
  "active",
  "inactive",
  "suspended",
]);

export const accommodations = pgTable("accommodations", {
  id: uuid().primaryKey().defaultRandom(),

  userId: text().references(() => user.id, { onDelete: "set null" }),
  categoryId: uuid().references(() => categories.id, { onDelete: "set null" }),
  name: varchar().notNull(),

  province: varchar().notNull(),
  city: varchar().notNull(),
  address: varchar().notNull(),
  description: text().notNull().default(""),

  capacity: integer().notNull(),
  pricePerNight: bigint({ mode: "number" }).notNull(), // Toman

  status: accommodationStatus().notNull().default(DEFAULT_ACCOMMODATION_STATUS),

  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
export type IAccommodation = typeof accommodations.$inferSelect;

// favorites
export const favorites = pgTable(
  "favorites",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accommodationId: uuid()
      .notNull()
      .references(() => accommodations.id, { onDelete: "cascade" }),
  },
  (t) => [
    unique("favorites_user_accommodation_unique").on(
      t.userId,
      t.accommodationId,
    ),
  ],
);

//reservations
const DEFAULT_RESERVATION_STATUS = "pending";
export const reservationStatus = pgEnum("reservation_status", [
  DEFAULT_RESERVATION_STATUS,
  "confirmed",
  "cancelled",
  "completed",
]);

export const reservations = pgTable("reservations", {
  id: uuid().primaryKey().defaultRandom(),

  userId: text().references(() => user.id, { onDelete: "set null" }),
  accommodationId: uuid().references(() => accommodations.id, {
    onDelete: "set null",
  }),

  checkIn: date().notNull(),
  checkOut: date().notNull(),

  totalPrice: bigint({ mode: "number" }).notNull(), // Toman

  status: reservationStatus().notNull().default(DEFAULT_RESERVATION_STATUS),

  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
export type IReservation = typeof accommodations.$inferSelect;
