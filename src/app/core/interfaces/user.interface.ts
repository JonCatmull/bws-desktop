export interface User {
    id: number;
    token: string;
    username: string;
    // websites: {[key: number]: string}
    websites: {id: number, name: string}[];
}