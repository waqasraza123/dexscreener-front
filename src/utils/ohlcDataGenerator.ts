import { OHLCData } from "../interfaces/utils/ohlcDataGenerator";

export const generateOHLCData = (days: number): OHLCData[] => {
    const data: OHLCData[] = [];
    let lastClose = 100; // Starting price
    const oneDay = 1000 * 60 * 60 * 24;

    for (let i = 0; i < days; i++) {
        const open = lastClose;
        const high = open + Math.random() * 10;
        const low = open - Math.random() * 10;
        const close = low + Math.random() * (high - low);
        lastClose = close;

        data.push({
            date: new Date(Date.now() - oneDay * (days - i - 1)), // Adjust for one day
            open,
            high,
            low,
            close,
        });
    }

    return data;
};
