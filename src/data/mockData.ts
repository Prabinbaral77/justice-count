export interface Comment {
    id: string;
    text: string;
    author: string;
    createdAt: string;
}

export interface Case {
    id: string;
    title: string;
    victimName: string;
    startDate: string; // ISO date string
    description: string;
    tagline: string;
    imageUrl?: string;
    votes: {
        served: number;
        denied: number;
    };
    comments: Comment[];
    priority: boolean;
    isFeatured: boolean;
    status: 'pending' | 'approved' | 'rejected';
}

export const initialCases: Case[] = [
    {
        id: 'case-1',
        title: 'Nirmala Panta Murder Case',
        victimName: 'Nirmala Panta',
        startDate: '2018-07-26T00:00:00Z',
        description: 'The deeply disturbing case of a 13-year-old girl whose tragic death remains unresolved, sparking nationwide protests for justice.',
        tagline: 'न्याय त मरिसक्यो रे आमा',
        imageUrl: '/victims/nirmala.png',
        votes: {
            served: 5,
            denied: 18453,
        },
        comments: [
            { id: 'c1', text: 'We will never forget.', author: 'Citizen', createdAt: new Date().toISOString() }
        ],
        priority: true,
        isFeatured: false,
        status: 'approved'
    },
    {
        id: 'case-2',
        title: 'Ganga Maya Adhikari Struggle',
        victimName: 'Krishna Prasad Adhikari',
        startDate: '2004-06-06T00:00:00Z',
        description: 'The tireless hunger strike of a mother demanding justice for her son murdered during the conflict era.',
        tagline: 'सास रहुन्जेल आश',
        imageUrl: '/victims/Inisha.png',
        votes: {
            served: 24,
            denied: 9832,
        },
        comments: [],
        priority: true,
        isFeatured: true,
        status: 'approved'
    },
    {
        id: 'case-3',
        title: 'Nirmala Panta Murder Case',
        victimName: 'Nirmala Panta',
        startDate: '2018-07-26T00:00:00Z',
        description: 'The deeply disturbing case of a 13-year-old girl whose tragic death remains unresolved, sparking nationwide protests for justice.',
        tagline: 'न्याय त मरिसक्यो रे आमा',
        imageUrl: '/victims/nirmala.png',
        votes: {
            served: 5,
            denied: 18453,
        },
        comments: [
            { id: 'c1', text: 'We will never forget.', author: 'Citizen', createdAt: new Date().toISOString() }
        ],
        priority: true,
        isFeatured: false,
        status: 'approved'
    },
];
