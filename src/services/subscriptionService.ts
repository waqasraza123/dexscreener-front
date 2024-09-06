import axios from 'axios';
import { SubscriptionResponse } from '../interfaces/services/SubscriptionService/SubscriptionResponse';

const API_URL = process.env.REACT_APP_API_BASE_URL as string;

class SubscriptionService {
  async createSubscription(data: { email: string; paymentMethodId: string; priceId: string }): Promise<SubscriptionResponse> {
    const response: any = await axios.post(API_URL + '/api/stripe/subscriptions', {
      body: data,
    });

    if (!response.ok) {
      throw new Error('Failed to create subscription');
    }

    return await response.json();
  }
}

export default new SubscriptionService();
