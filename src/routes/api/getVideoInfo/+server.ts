import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { youtube } from "@/lib/youtube";

export const GET: RequestHandler = async ({ request, params, url }) => {

    let id = url.searchParams.get("id");

    if (!id) {
        throw error(400, "video id is required")
    }

    const info = await youtube.getInfo(id)

    return json(info);
};