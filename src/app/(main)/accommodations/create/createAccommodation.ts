"use server";
//Global Imports
import { db } from "@/db";
import { accommodations } from "@/db/schema";
//Local Imports
import { createAccommodationFormValues } from "./schema";

export async function createAccommodation(
  formData: createAccommodationFormValues,
) {
  return await db.insert(accommodations).values(formData);
}
