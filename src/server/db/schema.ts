import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const challenge = pgTable('challenge', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }).notNull(),
  banner: varchar('banner', { length: 256 }).notNull(),
  typeID: integer('type_id')
    .notNull()
    .references(() => challengeType.id),
  categoryID: integer('category_id')
    .notNull()
    .references(() => challengeCategory.id, { onDelete: 'restrict' }),
});

export const challengeCategory = pgTable('challenge_category', {
  id: serial('id').primaryKey(),
  category: varchar('category', { length: 256 }).notNull(),
});

export const challengeType = pgTable('challenge_type', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 256 }).notNull(),
});

export const milestone = pgTable('milestone', {
  id: serial('id').primaryKey(),
  roomID: integer('room_id').references(() => room.id),
  userID: varchar('user_id', { length: 256 }),
  timestamp: timestamp('timestamp'),
  description: varchar('description', { length: 256 }),
  ticked: boolean('ticked'),
  title: varchar('title', { length: 256 }),
});

export const milestoneMedia = pgTable('milestone_media', {
  id: serial('id').primaryKey(),
  milestoneID: integer('milestone_id').references(() => milestone.id),
  link: varchar('link', { length: 256 }),
});

export const room = pgTable('room', {
  id: serial('id').primaryKey(),
  challengeID: integer('challenge_id').references(() => challenge.id),
  code: varchar('code', { length: 256 }),
  link: varchar('link', { length: 256 }),
  created: timestamp('created'),
  codeCreatedTimestamp: timestamp('code_created_timestamp'),
});

export const userRoom = pgTable(
  'user_room',
  {
    id: serial('id').primaryKey(),
    roomID: integer('room_id').references(() => room.id),
    userID: varchar('user_id', { length: 256 }),
    joined: timestamp('joined'),
    isAdmin: boolean('is_admin'),
  },
  () => ({
    unique: [
      {
        columns: ['room_id', 'user_id'],
      },
    ],
  }),
);
