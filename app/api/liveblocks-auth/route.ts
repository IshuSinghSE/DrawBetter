import { api } from "@/convex/_generated/api";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  try {
    
    const authorization = await auth();
    const user = await currentUser();


    if (!authorization || !user) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { room } = await request.json();

    // Skip organization check if not using organizations
    if (room) {
      try {
        const draw = await convex.query(api.draw.get, { id: room });
        
        // Only check orgId if the draw exists and has an orgId
        if (draw && draw.orgId && draw.orgId !== authorization.orgId) {
          return new Response("Unauthorized - Organization mismatch", { status: 403 });
        }
      } catch (convexError) {
        // Continue without strict org check if Convex fails
        console.error("⚠️ Convex error during org check:", convexError);
      }
    }

    const userInfo = {
      name: user.firstName || user.lastName || user.username || "User",
      picture: user.imageUrl,
    };


    const session = liveblocks.prepareSession(user.id, {
      userInfo,
    });

    if (room) {
      session.allow(room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();

    return new Response(body, { status });
  } catch (error) {
    console.error("💥 Liveblocks auth error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Authentication failed", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }), 
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
