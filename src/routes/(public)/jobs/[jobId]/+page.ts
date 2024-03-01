import {pb} from "$lib/pocketbase";
import type {DBJob} from "$lib/types";

const NOT_FOUND_ERROR = {
    status: 404,
    body: {
        message: 'Not found'
    }
};

export const load = async ({params}: {params: {jobId: string}}) => {
    console.log(params.jobId);

    const job = await pb.collection("jobs").getFullList({
        filter: `id = "${params.jobId}" && open = true`,
        expand: "locations,tags"
    });

    if (!job.length) {
        return NOT_FOUND_ERROR;
    }

    return {
        job: job[0]
    };
}