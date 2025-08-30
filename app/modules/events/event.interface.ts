export type Tevent = {
    name: string;
    price: number;
    date: Date;
    start_time: string;
    end_time: string;
    memberType: 'free trial' | 'premium' | 'standard' | 'standard and premium';
    location: string;
    description: string;
    availableSeats: number;
    image: string;
    isDeleted: boolean;
}