export interface SubscriptionResponse {
    id: string;
    status: string;
    customer: string;
    items: {
      data: {
        id: string;
        price: {
          id: string;
          unit_amount: number;
          currency: string;
          product: string;
        };
        quantity: number;
      }[];
    };
    latest_invoice: {
      id: string;
      payment_intent: {
        id: string;
        status: string;
        client_secret: string;
      };
    };
  }
  