"use client";

import { createContext, useContext, useEffect, useState } from "react";

type BookmarkContextType = {
  bookmarks: string[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (id: string) => void;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bookmarks");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setBookmarks(parsed);
      }
    } catch (err) {
      console.error("Error loading bookmarks from localStorage", err);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks, isReady]);

  const isBookmarked = (id: string | number) => bookmarks.includes(String(id));

  const toggleBookmark = (id: string | number) => {
    const idStr = String(id);
    setBookmarks((prev) =>
      prev.includes(idStr)
        ? prev.filter((b) => b !== idStr)
        : Array.from(new Set([...prev, idStr]))
    );
  };

  if (!isReady) return null;

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, isBookmarked, toggleBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context)
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  return context;
};
