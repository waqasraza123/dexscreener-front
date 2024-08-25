import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Token } from '../interfaces/Token';

interface TokenTableProps {
  data: Token[];
}

const TokenTable: React.FC<TokenTableProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleTokenClick = (token: Token) => {
    navigate(`/${token.token.chainSymbol}/${token.contract_address}`, { state: token });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {['Token', 'Price', 'Age', 'Txns', 'Volume', 'Makers', '5m', '1h', '6h', '24h', 'Liquidity', 'MCAP'].map(header => (
              <th key={header} className="py-2 px-4 text-left text-gray-700 font-semibold border-b text-sm">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((token, index) => (
            <tr
              onClick={() => handleTokenClick(token)}
              key={index}
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} cursor-pointer`}
            >
              <td className="py-2 px-4 border-b text-gray-700 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold">{token.token.number}</span>
                  <img src={token.token.chainLogoUrl} alt="Chain Logo" className="w-4 h-4" />
                  <img src={token.token.dexLogoUrl} alt="DEX Logo" className="w-4 h-4" />
                  <span className="text-sm font-semibold">{token.token.tokenSymbol}</span>
                  <span className="mx-1">/</span>
                  <span className="text-sm">{token.token.chainSymbol}</span>
                  <img src={token.token.tokenImageUrl} alt="Token Logo" className="w-4 h-4" />
                  <span className="text-sm">{token.token.tokenName}</span>
                </div>
              </td>
              <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.price}</td>
              <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.age}</td>
              <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.txns}</td>
              <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.volume}</td>
              <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.makers}</td>
              <td className="py-2 px-4 border-b text-gray-700 text-sm">{token['5m']}</td>
              <td className="py-2 px-4 border-b text-gray-700 text-sm">{token['1h']}</td>
              <td className="py-2 px-4 border-b text-gray-700 text-sm">{token['6h']}</td>
              <td className="py-2 px-4 border-b text-gray-700 text-sm">{token['24h']}</td>
              <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.liquidity}</td>
              <td className="py-2 px-4 border-b text-gray-700 text-sm">{token.mcap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenTable;
