import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
  "/placeholders/11.svg",
  "/placeholders/12.svg",
  "/placeholders/13.svg",
  "/placeholders/14.svg",
  "/placeholders/15.svg",
  "/placeholders/16.svg",
  "/placeholders/17.svg",
  "/placeholders/18.svg",
  "/placeholders/19.svg",
  "/placeholders/20.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const draw = await ctx.db.insert("draw", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return draw;
  },
});

export const remove = mutation({
  args: {
    id: v.id("draw"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_draw", (q) =>
        q.eq("userId", userId).eq("drawId", args.id)
      )
      .unique();

    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }
    await ctx.db.delete(args.id);
  },
});

export const rename = mutation({
  args: {
    id: v.id("draw"),
    title: v.string(),
  },

  handler: async (ctx, args) => {
    const title = args.title.trim();
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    if (!title) {
      throw new Error("Title is required");
    }

    if (title.length > 60) {
      throw new Error("Title cannot be more than 60 characters");
    }

    const draw = await ctx.db.patch(args.id, { title: args.title });
    return draw;
  },
});

export const favorite = mutation({
  args: { id: v.id("draw"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const draw = await ctx.db.get(args.id);

    if (!draw) {
      throw new Error("Draw not found");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_draw", (q) =>
        q.eq("userId", userId).eq("drawId", draw._id)
      )
      .unique();

    if (existingFavorite) {
      throw new Error("Already favorited");
    }

    await ctx.db.insert("userFavorites", {
      orgId: args.orgId,
      userId: userId,
      drawId: draw._id,
    });

    return draw;
  },
});

export const unfavorite = mutation({
  args: { id: v.id("draw") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const draw = await ctx.db.get(args.id);

    if (!draw) {
      throw new Error("Draw not found");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_draw", (q) =>
        q.eq("userId", userId).eq("drawId", draw._id)
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Favorite not found");
    }

    await ctx.db.delete(existingFavorite._id);

    return draw;
  },
});


export const get = query({
  args: {
    id: v.id("draw")
  },
  handler: async (ctx, args) => {
    const draw = ctx.db.get(args.id);

    return draw;
  }
})