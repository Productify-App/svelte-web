interface job {
    title: string;
    locations: string[];
    tags: string[];
    id: string;

    overview: string;
    expectations: string;
    requirements: string[];
}

export type { job };