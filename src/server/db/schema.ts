import { relations } from 'drizzle-orm';
import { boolean, integer, pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const challengeTypeEnum = pgEnum('challenge_type', ['goal', 'habit']);
export const challengeCategoryEnum = pgEnum('challenge_category', ['sport', 'social', 'lifestyle']);

export const challenge = pgTable('challenge', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }).notNull(),
  banner: varchar('banner', { length: 256 }).notNull(),
  type: challengeTypeEnum('type').notNull(),
  category: challengeCategoryEnum('category').notNull(),
});

export type Challenge = typeof challenge.$inferSelect;

export const challengeRelations = relations(challenge, ({ one, many }) => ({
  rooms: many(room),
}));

export const milestone = pgTable('milestone', {
  id: serial('id').primaryKey(),
  roomID: integer('room_id').references(() => room.id),
  userID: varchar('user_id', { length: 256 }).notNull(),
  timestamp: timestamp('timestamp').notNull(),
  description: varchar('description', { length: 256 }),
  isLastMilestone: boolean('is_last_milestone').default(false).notNull(),
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
  challengeID: integer('challenge_id')
    .references(() => challenge.id)
    .notNull(),
  link: varchar('link', { length: 256 }).default('').notNull(),
  isLinkActive: boolean('is_link_active').default(false).notNull(),
  isChallengeCompleted: boolean('is_challenge_completed').default(false).notNull(),
  created: timestamp('created').notNull().defaultNow(),
  codeCreatedTimestamp: timestamp('code_created_timestamp').notNull().defaultNow(),
});

export type Room = typeof room.$inferSelect;

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
    roomID: integer('room_id')
      .references(() => room.id)
      .notNull(),
    userID: varchar('user_id', { length: 256 }).notNull(),
    joined: timestamp('joined'),
    isAdmin: boolean('is_admin'),
  },
  //TODO double check this config
  () => ({
    unique: [
      {
        columns: ['room_id', 'user_id'],
      },
    ],
  }),
);

export type UserRoom = typeof userRoom.$inferSelect;

export const userRoomRelations = relations(userRoom, ({ one }) => ({
  room: one(room, {
    fields: [userRoom.roomID],
    references: [room.id],
  }),
}));
