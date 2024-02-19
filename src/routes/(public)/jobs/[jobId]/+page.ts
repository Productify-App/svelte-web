import { jobs } from '$lib/jobs.json';

const NOT_FOUND_ERROR = {
    status: 404,
    body: {
        message: 'Not found'
    }
};

export const load = async ({params}: {params: {jobId: string}}) => {
    const jobId = params.jobId;

    if (!jobId) {
        return NOT_FOUND_ERROR;
    }

    const job = jobs.find(job => job.id === jobId);

    if (!job) {
        return NOT_FOUND_ERROR;
    }

    return {
        job: job
    };
}