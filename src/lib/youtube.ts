import { Innertube } from 'youtubei.js';

const globalForYoutube = globalThis as unknown as { youtube: Innertube };

export const youtube =
    globalForYoutube.youtube ||
    await Innertube.create();