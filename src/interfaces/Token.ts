export interface Token {
  contract_address: string;
  token: {
    number: string;
    chainLogoUrl: string;
    dexLogoUrl: string;
    tokenSymbol: string;
    chainSymbol: string;
    tokenImageUrl: string;
    tokenName: string;
  };
  price: string;
  age: string;
  txns: string;
  volume: string;
  makers: string;
  ['5m']: string;
  ['1h']: string;
  ['6h']: string;
  ['24h']: string;
  liquidity: string;
  mcap: string;
}