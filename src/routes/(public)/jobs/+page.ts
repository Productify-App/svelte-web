import { jobs } from '$lib/jobs.json';
import {pb} from "$lib/pocketbase";

export const load = async ({}) => {
    const response = await pb.collection("jobs").getFullList({
        filter: "open = true",
        expand: "locations,tags"
    });

    const dbTags = await pb.collection("tags").getFullList();
    const tags = dbTags.map(tag => tag.tag);
    // add All Positions to the start of the tags list
    tags.unshift("All Positions");

    return {
        jobs: response,
        tags: tags
    }
}