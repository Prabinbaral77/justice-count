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
        title: 'निर्मला पन्त बलात्कार तथा हत्या प्रकरण',
        victimName: 'निर्मला पन्त',
        startDate: '2018-07-27T00:00:00Z',
        description: '१३ वर्षकी नर्मलाको आवाज आज पनि प्रतिक्षामै छ, सत्य अन्धकारमै हराइरहेको छ, एक निर्दोष जीवन गुम्यो, तर दोषी अझै स्वतन्त्र छन्, र देशभरि एउटै प्रश्न गुञ्जिरहेको छ—हामीले अझै कति दिन कुर्नु पर्ने?',
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
        title: 'इनिशा बिक बलात्कार तथा हत्या प्रकरण',
        victimName: 'इनिशा बिक',
        startDate: '2026-03-07T00:00:00Z',
        description: '१६ वर्षकी इनिशा बिकको चिच्याहटले देश नै हल्लियो, तर न्याय अझै मौन छ—कति छोरीहरू अझै गुम्नुपर्छ तब मात्र कानुन जाग्ने हो? अपराधीहरू नडराउनुको कारण नै सजायको डर नहुनु हो, र यही मौनताले उनीहरूलाई झन् बल दिइरहेको छ; अब कुनै बहाना होइन, कुनै दया होइन—निर्दयीका लागि कडा न्याय चाहिन्छ, किनकि प्रत्येक ढिलाइले अर्को निर्दोष जीवन जोखिममा पारिरहेको छ।',
        tagline: 'सत्य अझै अन्धकारमै छ',
        imageUrl: '/victims/Inisha.png',
        votes: {
            served: 24,
            denied: 9832,
        },
        comments: [],
        priority: true,
        isFeatured: true,
        status: 'approved'
    }
];
