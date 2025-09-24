import { getServerSession, Session } from "next-auth";
import { authOptions } from "./authOptions";

export const getUserSession = async (): Promise<
  Session["user"] | undefined
> => {
  const authUserSession = await getServerSession(authOptions);
  return authUserSession?.user;
};
  