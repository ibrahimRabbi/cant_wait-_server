export type Tsubscription = {
    planType: 'trial' | 'premium' | 'standard';
    price: number;
    duration: Date;
    features: string[];
    isDeleted: boolean
}