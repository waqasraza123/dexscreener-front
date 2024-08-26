export interface Price {
    id: string;
    nickname: string | null;
    unit_amount: number | null;
    recurring: {
      interval: string;
    } | null;
    metadata: any;
}