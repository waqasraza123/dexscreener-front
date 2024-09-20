import React from 'react';
import { Token } from '../interfaces/Token';
import { useParams, useLocation } from 'react-router-dom';
import { generateOHLCData } from '../utils/ohlcDataGenerator';
import CandlestickChart from '../components/CandlestickChart';

const TokenView: React.FC = () => {
    const { chainId, contractAddress } = useParams<{ chainId: string; contractAddress: string }>();
    const location = useLocation();
    const token = location.state as Token;

    // Generate random data for 5 days
    const ohlcData = generateOHLCData(287);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Token Details</h1>
            <div className="bg-white shadow-md rounded-lg p-4 mb-8">
                <p><strong>Chain:</strong> {chainId}</p>
                <p><strong>Contract Address:</strong> {contractAddress}</p>
                <p><strong>Token Symbol:</strong> {token.token.tokenSymbol}</p>
                <p><strong>Token Name:</strong> {token.token.tokenName}</p>
                <p><strong>Price:</strong> {token.price}</p>
                <p><strong>Age:</strong> {token.age}</p>
                <p><strong>Transactions:</strong> {token.txns}</p>
                <p><strong>Volume:</strong> {token.volume}</p>
            </div>

            <h2 className="text-xl font-semibold mb-4">Candlestick Chart</h2>
            <CandlestickChart data={ohlcData} />
        </div>
    );
};

export default TokenView;