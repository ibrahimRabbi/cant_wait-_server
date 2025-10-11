export type Tevent = {
    name: string;
    price: number;
    date: Date;
    start_time: string;
    memberType: ['free-trial' | 'premium' | 'standard' ];
    location: string;
    description: string;
    availableSeats: number;
    image: string;
    isDeleted: boolean;
}