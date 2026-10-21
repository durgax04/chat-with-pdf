"use client";

import { useCallback, useState } from "react";

export type UseCopyToClipboardReturn = [
  (text: string) => Promise<void>,
  boolean
];

export const useCopyToClipboard = (): UseCopyToClipboardReturn => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) return;

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // auto reset
    } catch (e) {
      setIsCopied(false);
    }
  }, []);

  return [copy, isCopied];
};
