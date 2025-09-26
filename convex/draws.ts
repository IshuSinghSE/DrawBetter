import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: { orgId: v.string(), search: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const title = args.search as string;
    let draws = [];

    if (title) {
      draws = await ctx.db
        .query("draw")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      draws = await ctx.db
        .query("draw")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const drawsWithFavoriteRelateion = draws.map((draw) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_draw", (q) =>
          q.eq("userId", identity.subject).eq("drawId", draw._id)
        )
        .unique()
        .then((favorite) => {
          return {
            ...draw,
            isFavorite: !!favorite,
          };
        });
    });

    const drawsWithFavoriteBoolean = Promise.all(drawsWithFavoriteRelateion);
    return drawsWithFavoriteBoolean;
  },
});
