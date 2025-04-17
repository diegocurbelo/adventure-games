export interface Phrase {
    id: string;
    text: string;
}

export interface Game {
    id: string;
    name: string;
    imageUrl: string;
    disabled?: boolean;
    phrases: Phrase[];
}