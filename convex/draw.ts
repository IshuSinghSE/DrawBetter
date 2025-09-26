import { mutation } from "./_generated/server";
import { v } from "convex/values";

const images = [
  "/placeholders/(1).png",
  "/placeholders/(2).png",
  "/placeholders/(3).png",
  "/placeholders/(4).png",
  "/placeholders/(5).png",
  "/placeholders/(6).png",
  "/placeholders/(7).png",
  "/placeholders/(8).png",
  "/placeholders/(9).png",
  "/placeholders/(10).png",
  "/placeholders/(11).png",
  "/placeholders/(12).png",
  "/placeholders/(13).png",
  "/placeholders/(14).png",
  "/placeholders/(15).png",
  "/placeholders/(16).png",
  "/placeholders/(17).png",
  "/placeholders/(18).png",
  "/placeholders/(19).png",
  "/placeholders/(20).png",
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
