import { type job } from '$lib/types';
export const load = async ({}) => {
    const response: job[] = [
        {
            title: 'Software Engineer',
            location: 'San Francisco',
            id: '1',
            tags: ['react', 'node', 'typescript']
        },
        {
            title: 'Product Manager',
            location: 'New York',
            id: '2',
            tags: ['product', 'management', 'strategy']
        },
        {
            title: 'Data Scientist',
            location: 'San Francisco',
            id: '3',
            tags: ['data', 'science', 'python']
        },
        {
            title: 'Software Engineer',
            location: 'New York',
            id: '4',
            tags: ['react', 'node', 'typescript']
        },
        {
            title: 'Product Manager',
            location: 'San Francisco',
            id: '5',
            tags: ['product', 'management', 'strategy']
        },
        {
            title: 'Data Scientist',
            location: 'New York',
            id: '6',
            tags: ['data', 'science', 'python']
        },
    ];

    return {
        jobs: response
    }
}