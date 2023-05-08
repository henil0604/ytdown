import { writable } from "svelte/store";
import type { VideoInfo } from "youtubei.js/dist/src/parser/youtube";

export const NewDownloadCardLoading = writable(false);