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
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Token Performance
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-12">
          {['Token', 'Price', 'Age', 'Txns', 'Volume', 'Makers', '5m', '1h', '6h', '24h', 'Liquidity', 'MCAP'].map(header => (
            <div key={header} className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                {header}
              </h5>
            </div>
          ))}
        </div>

        {data.map((token, index) => (
          <div
            key={index}
            className={`grid grid-cols-4 sm:grid-cols-12 ${index === data.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'} cursor-pointer`}
            onClick={() => handleTokenClick(token)}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <img src={token.token.tokenImageUrl} alt="Token" className="w-6 h-6" />
              <div>
                <p className="text-black dark:text-white font-semibold">{token.token.tokenSymbol}</p>
                <p className="text-gray-600 dark:text-gray-400">{token.token.tokenName}</p>
              </div>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">${token.price}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{token.age}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{token.txns}</p>
            </div>

            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{token.volume}</p>
            </div>

            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{token.makers}</p>
            </div>

            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{token['5m']}%</p>
            </div>

            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{token['1h']}%</p>
            </div>

            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{token['6h']}%</p>
            </div>

            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{token['24h']}%</p>
            </div>

            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">${token.liquidity}</p>
            </div>

            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">${token.mcap}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenTable;
