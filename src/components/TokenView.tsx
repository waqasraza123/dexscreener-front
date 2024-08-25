import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Token } from '../interfaces/Token';

interface TokenViewProps {
  token: Token;
}

const TokenView: React.FC = () => {
  const { chainId, contractAddress } = useParams<{ chainId: string; contractAddress: string }>();
  const location = useLocation();
  const token = location.state as Token;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Token Details</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <p><strong>Chain:</strong> {chainId}</p>
        <p><strong>Contract Address:</strong> {contractAddress}</p>
        <p><strong>Token Symbol:</strong> {token.token.tokenSymbol}</p>
        <p><strong>Token Name:</strong> {token.token.tokenName}</p>
        <p><strong>Price:</strong> {token.price}</p>
        <p><strong>Age:</strong> {token.age}</p>
        <p><strong>Transactions:</strong> {token.txns}</p>
        <p><strong>Volume:</strong> {token.volume}</p>
      </div>
    </div>
  );
};

export default TokenView;
