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
            title: 'Marketing Manager',
            location: 'San Francisco',
            id: '3',
            tags: ['marketing', 'strategy', 'growth']
        },
        {
            title: 'Sales Manager',
            location: 'New York',
            id: '4',
            tags: ['sales', 'growth', 'strategy']
        },
        {
            title: 'UI/UX Designer',
            location: 'San Francisco',
            id: '5',
            tags: ['design', 'UI', 'UX']
        }
    ];

    return {
        jobs: response
    }
}