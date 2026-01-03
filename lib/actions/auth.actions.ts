"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Check against the .env file
  if (
    email === process.env.ADMIN_EMAIL && 
    password === process.env.ADMIN_PASSWORD
  ) {
    // 👇 FIX: Await the cookies() function first!
    const cookieStore = await cookies();
    
    // 2. Success! Set a secure cookie (The "Stamp")
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 Day
      path: "/",
    });
    
    redirect("/");
  } else {
    // 3. Failure
    return { error: "Invalid credentials" };
  }
}

export async function logout() {
  // 👇 FIX: Await cookies() here too!
  const cookieStore = await cookies();
  
  // Delete the cookie
  cookieStore.delete("admin_session");
  redirect("/login");
}