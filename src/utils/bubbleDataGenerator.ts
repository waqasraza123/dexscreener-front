import { BubbleData } from "../interfaces/utils/bubbleDataGenerator";

export const generateBubbleData = (numBubbles: number, total: number): BubbleData[] => {
    const remainingTotal = total; 

    // Define a fixed color palette
    const colorPalette = ['#FF5733', '#FFBD33', '#33FF57', '#33A7FF']; // Colors for ranking

    const bubbles = Array.from({ length: numBubbles }, () => {
        const percentage = Math.random() * 100; // Random percentage for each bubble
        return {
            x: Math.random() * 100,
            y: Math.random() * 100,
            r: Math.random() * 20 + 5, // Radius between 5 and 25
            percentage: (percentage / 100) * remainingTotal, // Percentage of the total
        };
    });

    // Normalize the percentages so they add up to 100%
    const totalPercentage = bubbles.reduce((sum, b) => sum + b.percentage, 0);
    const normalizedBubbles = bubbles.map(bubble => ({
        ...bubble,
        percentage: (bubble.percentage / totalPercentage) * 100,
    }));

    // Sort the bubbles by percentage in descending order to assign colors based on rank
    const sortedBubbles = normalizedBubbles.sort((a, b) => b.percentage - a.percentage);

    // Assign colors based on the sorted percentage ranking
    return sortedBubbles.map((bubble, index) => ({
        ...bubble,
        color: colorPalette[index % colorPalette.length], // Assign colors based on rank
    }));
};
