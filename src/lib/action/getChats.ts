"use server";

import { getUserSession } from "../auth/session";
import { db } from "../prisma";

export const getChats = async () => {
  const user = await getUserSession();

  if (!user?.id) {
    throw new Error("Unauthorized");
  }
  const chats = await db.file.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log("chats---", chats);
  return chats;
};

export const getChatUrl = async () => {
  const urls = await db.file.findMany({
    select: {
      url: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log("URL---", urls);
  return urls;
};
