import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPrices } from '../services/stripeService';
import { Price } from '../interfaces/services/stripeService/Price';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage: React.FC = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useQuery<Price[]>({
        queryKey: ['prices'],
        queryFn: fetchPrices,
    });

    if (isLoading) return <div><LoadingSpinner /></div>;
    if (error) return <div>Error loading prices</div>;

    const handleOrderNowButton = () => {
        navigate('/subscriptions/user-input');
    };

  return (
    <div className="pt-5" id="pricing">
      <div className="mx-auto pb-20 mt-4 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-gray-800">Pricing</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-800 sm:text-5xl">
            Whether it's just you, or your entire team - we've got you covered.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-900">
          Choose the product that works best
        </p>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data?.map((price) => (
            <div
              key={price.id}
              className={`bg-gray-100 rounded-3xl p-8 xl:p-10 ${
                price.metadata.isPopular
                  ? 'bg-white/5 ring-2 ring-indigo-500'
                  : 'ring-1 ring-white/10'
              }`}
            >
                <div className="flex items-baseline justify-between gap-x-4">
                    <h2 className="text-lg font-semibold leading-8 text-black">
                    {price.nickname}
                    </h2>
                    {price.metadata.isPopular && (
                    <p className="rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                        Most popular
                    </p>
                    )}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                    {price.metadata.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                        ${price.unit_amount ? (price.unit_amount / 100).toFixed(2) : 'N/A'}
                    </span>
                    <span className="text-sm font-semibold leading-6 text-gray-900">
                    / {price.recurring?.interval}
                    </span>
                </p>
                <button
                    onClick={() => navigate('/subscriptions/user-input', { state: { priceId: price.id } })}
                    className={`mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        price.metadata.isPopular
                        ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                        : 'bg-gray-900 text-white hover:bg-green-400 hover:text-white hover:scale-105 hover:shadow-lg transform transition-all duration-100 ease-in-out p-4 rounded-lg'
                    }`}
                    >
                        Order Now
                    </button>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-800 xl:mt-10">
                    {Object.keys(price.metadata)
                        .filter((key) => key.startsWith("feature_"))
                        .sort((a, b) => a.localeCompare(b))
                        .map((key, index) => (
                        <li key={index} className="flex gap-x-3">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-6 w-5 flex-none text-green-400"
                            >
                            <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clipRule="evenodd"
                            />
                            </svg>
                            {price.metadata[key]}
                        </li>
                    ))}
                </ul>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
