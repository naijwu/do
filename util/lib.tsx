

export type Item = {
    id?: string;
    title: string;
    description?: string;

    type?: 'personal' | 'service' | 'work' | 'school' | 'hobby' | 'other';

    school_course?: string;
    school_type?: 'assignment' | 'examlet' | 'self' | 'quiz' | 'prelecture' | 'lab' | 'final' | 'other';

    due?: Date | string;
    status: 'queued' | 'progress' | 'done' | 'unfinished'
}