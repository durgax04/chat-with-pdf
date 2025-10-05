"use server";

import { db } from "../prisma";

export const getChats = async () => {

    const chats = await db.file.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    // console.log("chats---", chats);
    return chats;
}

export const getChatUrl = async () => {
    const urls = await db.file.findMany({
        select: {
            url: true
        },
        orderBy: {
            createdAt: "desc"
        }
    }); 
    console.log("URL---", urls);
    return urls;

};

