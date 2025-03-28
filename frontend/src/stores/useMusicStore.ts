import { create } from "zustand";

import { axiosInstance } from "@/lib/axios";
import { Album, Song } from "@/types";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;

  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data });
    } catch (err) {
      set({ error: err.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
