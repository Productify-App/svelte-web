import { pb } from '$lib/pocketbase.ts';
import type {DBJob} from "$lib/types";

export const load = async ({ params }) => {
    const jobs = await pb.collection('jobs').getFullList<DBJob>({
        filter: "open = true",
        expand: "locations"
    });

    return {
        jobs,
        defaultJob: null
    };
}