import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTokens } from '../services/tokenService';
import TokenTable from '../components/TokenTable';
import { Token } from '../interfaces/Token';

const Home: React.FC = () => {
  const { data, isLoading, error } = useQuery<Token[]>({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Private Dexscreener</h1>
      {data && (
        <TokenTable
          data={data}
        />
      )}
    </div>
  );
};

export default Home;
