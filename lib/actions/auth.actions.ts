"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Admin Login Action
 * Validates credentials against environment variables and establishes a secure session.
 */
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  /**
   * Credential Validation
   * For security, we compare the inputs against ADMIN_EMAIL and ADMIN_PASSWORD
   * stored in the protected .env file on the server.
   */
  if (
    email === process.env.ADMIN_EMAIL && 
    password === process.env.ADMIN_PASSWORD
  ) {
    
    const cookieStore = await cookies();
    /**
     * Session Creation
     * We set an HTTP-only cookie to serve as the "session stamp."
     * - httpOnly: Prevents client-side JavaScript from accessing the cookie (XSS protection).
     * - secure: Ensures the cookie is only sent over HTTPS in production.
     * - maxAge: Set to 24 hours (60s * 60m * 24h).
     */
    
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 Day
      path: "/",
    });

    redirect("/");
  } else {
    /**
     * Authentication Failure
     * We return a plain object with an error message to be displayed 
     * on the client-side UI.
     */
    return { error: "Invalid credentials" };
  }
}

/**
 * Admin Logout Action
 * Destroys the secure session cookie and redirects to the login screen.
 */
export async function logout() {
  
  const cookieStore = await cookies();
  
  // Remove the session cookie to effectively log the user out
  cookieStore.delete("admin_session");
  // Force navigation back to the login pag
  redirect("/login");
}