interface job {
    title: string;
    locations: string[];
    tags: string[];
    id: string;

    overview: string;
    expectations: string;
    requirements: string[];
}

interface application {
    jobId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    linkedin: string;
    message: string;
    resume: File | null;
}

export type { job, application };