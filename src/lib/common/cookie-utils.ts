"use server";
import { cookies } from "next/headers";



export async function getCookieValue(key: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get(key);
  if (!token) {
    console.log("Cookie not found with key:", key);
    return "";
  }
  return token.value;
}

export async function setCookie(key: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: key,
    value,
    httpOnly: true,
    path: "/",
  });

 
}

export async function hasCookie(key: string) {
  const cookieStore = await cookies();
  return cookieStore.has(key);
}

export async function deleteCookie(key: string) {
  const cookieStore = await cookies();
  cookieStore.delete(key);

}


