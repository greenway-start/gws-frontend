export interface Book {
    id: string;
    title: string;
    author: string;
    avtor?: string;
    name?: string;
    publishDate?: string;
    [key: string]: any;
}

export type BookCreate = Omit<Book, 'id'> 

export type EventContext = {
    target: {
        value: string,
    },
}
