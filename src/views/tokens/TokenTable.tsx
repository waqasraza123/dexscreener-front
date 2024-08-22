import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTokens } from '../../services/tokenService';

interface Token {
  Token: string;
  Price: string;
  Age: string;
  Txns: string;
  Volume: string;
  Makers: string;
  ['5m']: string;
  ['1h']: string;
  ['6h']: string;
  ['24h']: string;
  Liquidity: string;
  MCAP: string;
}

const TokenTable: React.FC = () => {
  const { data, isLoading, error } = useQuery<Token[]>({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Private Dexscreener</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {['Token', 'Price', 'Age', 'Txns', 'Volume', 'Makers', '5m', '1h', '6h', '24h', 'Liquidity', 'MCAP'].map((header) => (
                <th key={header} className="py-2 px-4 text-left text-gray-700 font-semibold border-b text-sm">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((token, index) => (
              <tr key={token.Token} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {Object.values(token).map((value, idx) => (
                  <td key={idx} className="py-2 px-4 border-b text-gray-700 text-sm">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenTable;
