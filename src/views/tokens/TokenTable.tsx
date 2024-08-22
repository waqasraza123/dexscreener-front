import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTokens } from '../../services/tokenService';

interface Token {
  Token: {
    number: string;
    chainLogoUrl: string;
    dexLogoUrl: string;
    tokenSymbol: string;
    chainSymbol: string;
    tokenImageUrl: string;
    tokenName: string;
  };
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

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle sort direction if the same column is clicked
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set the new column and default to ascending sort direction
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!data) return [];

    const sorted = [...data];
    
    if (sortColumn) {
      sorted.sort((a, b) => {
        const aValue = a[sortColumn as keyof Token];
        const bValue = b[sortColumn as keyof Token];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }

    return sorted;
  }, [data, sortColumn, sortDirection]);

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
                <th
                  key={header}
                  className="py-2 px-4 text-left text-gray-700 font-semibold border-b text-sm cursor-pointer"
                  onClick={() => handleSort(header)}
                >
                  {header}
                  {sortColumn === header && (sortDirection === 'asc' ? ' 🔼' : ' 🔽')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((token, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b text-gray-700 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold">{token.Token.number}</span>
                    <img src={token.Token.chainLogoUrl} alt="Chain Logo" className="w-4 h-4" />
                    <img src={token.Token.dexLogoUrl} alt="DEX Logo" className="w-4 h-4" />
                    <span className="text-sm font-semibold">{token.Token.tokenSymbol}</span>
                    <span className="mx-1">/</span>
                    <span className="text-sm">{token.Token.chainSymbol}</span>
                    <img src={token.Token.tokenImageUrl} alt="Token Logo" className="w-4 h-4" />
                    <span className="text-sm">{token.Token.tokenName}</span>
                  </div>
                </td>
                <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.Price}</td>
                <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.Age}</td>
                <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.Txns}</td>
                <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.Volume}</td>
                <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.Makers}</td>
                <td className="py-2 px-4 border-b text-gray-700 text-sm">{token['5m']}</td>
                <td className="py-2 px-4 border-b text-gray-700 text-sm">{token['1h']}</td>
                <td className="py-2 px-4 border-b text-gray-700 text-sm">{token['6h']}</td>
                <td className="py-2 px-4 border-b text-gray-700 text-sm">{token['24h']}</td>
                <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.Liquidity}</td>
                <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.MCAP}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenTable;
