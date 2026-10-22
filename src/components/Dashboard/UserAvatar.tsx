"use client";

import Image from "next/image";

export const UserAvatar = ({ userImage }: { userImage?: string }) => {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden bg-linear-to-br from-pink-500 to-pink-600 flex items-center justify-center">
      {userImage ? (
        <Image
          src={userImage}
          alt="User profile"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <span className="text-sm font-semibold text-white">U</span>
      )}
    </div>
  );
};