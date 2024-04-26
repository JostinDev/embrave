import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const challenge = pgTable('challenge', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }).notNull(),
  banner: varchar('banner', { length: 256 }).notNull(),
  typeID: integer('type_id')
    .notNull()
    .references(() => challengeType.id, { onDelete: 'restrict' }),
  categoryID: integer('category_id')
    .notNull()
    .references(() => challengeCategory.id, { onDelete: 'restrict' }),
});

export const challengeRelations = relations(challenge, ({ one, many }) => ({
  category: one(challengeCategory, {
    fields: [challenge.categoryID],
    references: [challengeCategory.id],
  }),
  type: one(challengeType, {
    fields: [challenge.typeID],
    references: [challengeType.id],
  }),
  rooms: many(room),
}));

export const challengeCategory = pgTable('challenge_category', {
  id: serial('id').primaryKey(),
  category: varchar('category', { length: 256 }).notNull(),
});

export const challengeCategoryRelations = relations(challengeCategory, ({ many }) => ({
  challenges: many(challenge),
}));

export const challengeType = pgTable('challenge_type', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 256 }).notNull(),
});

export const challengeTypeRelations = relations(challengeType, ({ many }) => ({
  challenges: many(challenge),
}));

export const milestone = pgTable('milestone', {
  id: serial('id').primaryKey(),
  roomID: integer('room_id').references(() => room.id),
  userID: varchar('user_id', { length: 256 }).notNull(),
  timestamp: timestamp('timestamp').notNull(),
  description: varchar('description', { length: 256 }),
  ticked: boolean('ticked'),
  title: varchar('title', { length: 256 }),
});

export const milestoneRelations = relations(milestone, ({ one, many }) => ({
  room: one(room, {
    fields: [milestone.roomID],
    references: [room.id],
  }),
  medias: many(milestoneMedia),
}));

export const milestoneMedia = pgTable('milestone_media', {
  id: serial('id').primaryKey(),
  milestoneID: integer('milestone_id').references(() => milestone.id),
  link: varchar('link', { length: 256 }).notNull(),
});

export const milestoneMediaRelations = relations(milestoneMedia, ({ one }) => ({
  milestone: one(milestone, {
    fields: [milestoneMedia.milestoneID],
    references: [milestone.id],
  }),
}));

export const room = pgTable('room', {
  id: serial('id').primaryKey(),
  challengeID: integer('challenge_id').references(() => challenge.id),
  code: varchar('code', { length: 256 }),
  link: varchar('link', { length: 256 }).notNull(),
  created: timestamp('created').notNull().defaultNow(),
  codeCreatedTimestamp: timestamp('code_created_timestamp').notNull().defaultNow(),
});

export const roomRelations = relations(room, ({ one, many }) => ({
  challenge: one(challenge, {
    fields: [room.challengeID],
    references: [challenge.id],
  }),
  milestones: many(milestone),
  userRooms: many(userRoom),
}));

export const userRoom = pgTable(
  'user_room',
  {
    id: serial('id').primaryKey(),
    roomID: integer('room_id').references(() => room.id),
    userID: varchar('user_id', { length: 256 }).notNull(),
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

export const userRoomRelations = relations(userRoom, ({ one }) => ({
  room: one(room, {
    fields: [userRoom.roomID],
    references: [room.id],
  }),
}));
