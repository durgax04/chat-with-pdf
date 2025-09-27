"use server";

import { db } from "../prisma";

const getChats = async () => {

    const chats = await db.file.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    // console.log("chats---", chats);
    return chats;
}


export default getChats;