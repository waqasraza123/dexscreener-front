import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../components/LoadingSpinner';
import subscriptionService from '../services/subscriptionService';
import { SubscriptionResponse } from '../interfaces/services/SubscriptionService/SubscriptionResponse';

// Load Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);

const SubscriptionForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const priceId = location.state?.priceId;

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation<SubscriptionResponse, Error, { email: string; paymentMethodId: string; priceId: string }>({
    mutationFn: subscriptionService.createSubscription,
    onSuccess: (data) => {
      console.log('Subscription successful:', data);
      // Redirect or show success message
    },
    onError: (error) => {
      console.error('Error creating subscription:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet
    }

    setIsLoading(true);

    // Get card details
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsLoading(false);
      return;
    }

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: { email },
    });

    if (error) {
      console.error('Error creating payment method:', error);
      setIsLoading(false);
      return;
    }

    // Create subscription
    if (paymentMethod) {
      mutation.mutate({ email, paymentMethodId: paymentMethod.id, priceId });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Card Details</label>
        <CardElement className="border p-2 rounded" />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-2 px-4 rounded"
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? <LoadingSpinner /> : 'Subscribe'}
      </button>
    </form>
  );
};

const SubscriptionFormPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Enter Your Details</h2>
        <Elements stripe={stripePromise}>
          <SubscriptionForm />
        </Elements>
      </div>
    </div>
  );
};

export default SubscriptionFormPage;
