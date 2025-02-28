// Define types
export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    year: number;
    pages: number;
    publisher: string;
    price: number;
    image: string;
    description: string;
}

export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
}

