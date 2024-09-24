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
    <div className="overflow-x-auto rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

      <div className="min-w-full overflow-x-auto">
        <div className="flex flex-col">
          {/* Table Header */}
          <div className="flex">
            <div className="flex items-center justify-center p-2.5 xl:p-5 min-w-[250px]">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Token</h5>
            </div>
            {['Price', 'Age', 'Txns', 'Volume', 'Makers', '5m', '1h', '6h', '24h', 'Liquidity', 'MCAP'].map(header => (
              <div key={header} className="flex items-center justify-center p-2.5 xl:p-5 min-w-[120px]">
                <h5 className="text-sm font-medium uppercase xsm:text-base">{header}</h5>
              </div>
            ))}
          </div>

          {/* Table Data */}
          {data.map((token, index) => (
            <div
              key={index}
              className={`flex ${index === data.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'} cursor-pointer`}
              onClick={() => handleTokenClick(token)}
            >
              {/* Token Column */}
              <div className="flex items-center gap-2 p-2.5 xl:p-5 min-w-[250px]">
                <div className="flex-shrink-0">
                  <img src={token.token.tokenImageUrl} alt="Token" className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-black dark:text-white font-semibold truncate">{token.token.tokenSymbol}</p>
                  <p className="text-gray-600 dark:text-gray-400 truncate max-w-[150px]" title={token.token.tokenName}>{token.token.tokenName}</p>
                </div>
              </div>

              {/* Other Columns */}
              <div className="flex items-center justify-center p-2.5 xl:p-5 min-w-[120px]">
                <p className="text-black dark:text-white">${token.price}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5 min-w-[120px]">
                <p className="text-black dark:text-white">{token.age}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5 min-w-[120px]">
                <p className="text-black dark:text-white">{token.txns}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5 min-w-[120px]">
                <p className="text-black dark:text-white">{token.volume}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5 min-w-[120px]">
                <p className="text-black dark:text-white">{token.makers}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5 min-w-[120px]">
                <p className="text-black dark:text-white">{token['5m']}%</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5 min-w-[120px]">
                <p className="text-black dark:text-white">{token['1h']}%</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5 min-w-[120px]">
                <p className="text-black dark:text-white">{token['6h']}%</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5 min-w-[120px]">
                <p className="text-black dark:text-white">{token['24h']}%</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5 min-w-[120px]">
                <p className="text-black dark:text-white">${token.liquidity}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5 min-w-[120px]">
                <p className="text-black dark:text-white">${token.mcap}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenTable;
