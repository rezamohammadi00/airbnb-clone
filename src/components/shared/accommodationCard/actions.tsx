"use server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { favorites } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function addFavorite({
  accommodationId,
}: {
  accommodationId: string;
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user.id ?? "";

    await db.insert(favorites).values({ userId, accommodationId });

    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function removeFavorite({
  accommodationId,
}: {
  accommodationId: string;
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user.id ?? "";
    await db
      .delete(favorites)
      .where(
        and(
          eq(favorites.userId, userId),
          eq(favorites.accommodationId, accommodationId),
        ),
      );
    return { success: true };
  } catch {
    return { success: false };
  }
}
