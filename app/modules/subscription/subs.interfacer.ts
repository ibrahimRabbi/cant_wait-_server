export type Tsubscription = {
    planType: 'trial' | 'premium' | 'standard';
    price: number;
    durationType: 'monthly' | 'weekly' | 'yearly';
    benefits: string[];
    isDeleted: boolean
}