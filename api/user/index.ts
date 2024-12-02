import { ofetch } from "ofetch";
import type { UserDto, UserPostDto } from "./dto";
import type { User } from "~/types/user";

/**
 * Fetches a user by ID.
 *
 * @param userId The ID of the user to fetch.
 * @returns The user data.
 */
export async function fetchUser(userId: number): Promise<User> {
  const user = await ofetch<UserDto>(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return user;
}

/**
 * Fetches the posts of a user by ID.
 *
 * @param userId The ID of the user whose posts to fetch.
 * @returns The posts of the user.
 */
export async function fetchUserPosts(userId: number) {
  const posts = await ofetch<UserPostDto[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  return posts;
}

/**
 * Searches for users by query.
 *
 * @param query The query to search for.
 * @returns The users that match the query.
 */
export async function searchUsers(query: string) {
  const users = await ofetch<UserDto[]>(`https://jsonplaceholder.typicode.com/users?q=${query}`);
  return users;
}
