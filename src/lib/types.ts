interface Job {
    title: string;
    locations: string[];
    tags: string[];
    id: string;

    info: {
        overview: string;
        expectations: string;
        requirements: string[];
    };

    open: boolean;
}

interface DBJob extends Job {
    created: string;
    updated: string;
    expand: {
        locations: DBLocation[];
        tags: DBTag[];
    };
}

interface Location {
    id: string;
    location: string;
    abbreviation: string;
}

interface DBLocation extends Location {
    created: string;
    updated: string;
}

interface Tag {
    id: string;
    tag: string;
}

interface DBTag extends Tag {
    created: string;
    updated: string;
}

interface Application {
    jobId: string;
    location: string;
    fullTime: string;
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

export type { Job, Application, User, BotProtectedApplication, DBJob };