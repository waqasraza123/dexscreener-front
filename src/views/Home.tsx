import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTokens } from '../services/tokenService';
import TokenTable from '../components/TokenTable';
import { Token } from '../interfaces/Token';
import LoadingSpinner from '../components/LoadingSpinner';

const Home: React.FC = () => {

    const chainId = 'solana';

    const { data, isLoading, error } = useQuery<Token[]>({
        queryKey: ['tokens'],
        queryFn: () => fetchTokens(chainId),
    });

    if (isLoading) return <div><LoadingSpinner /></div>;
    if (error) return <div>Error fetching data</div>;

    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">List of Tokens</h1>
        {data && (
            <TokenTable
            data={data}
            />
        )}
        </div>
    );
};

export default Home;
