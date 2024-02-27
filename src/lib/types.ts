interface Job {
    title: string;
    locations: string[];
    tags: string[];
    id: string;

    overview: string;
    expectations: string;
    requirements: string[];
}

interface Application {
    jobId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    linkedin: string;
    message: string;
    resume: File | null;
}

interface BotProtectedApplication extends Application {
    hCaptchaToken: string;
}

interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    avatar: string;
    created: string;
    updated: string;
}

export type { Job, Application, User, BotProtectedApplication };