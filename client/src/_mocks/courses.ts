export interface Course {
    _id: string
    name: string;
    description: string;
    price: number;
    categories: string[];
    language: string;
    creator: string;
    score: number;
    access: string[];
    classes: string[];
    materials: string[];
}