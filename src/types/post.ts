export type Post = {
    title: string;
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    author: {
        id: string,
        name: string | null,
        email: string | null
    }
};