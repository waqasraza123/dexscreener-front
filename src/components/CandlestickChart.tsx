import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { OHLCData } from '../interfaces/utils/ohlcDataGenerator';

interface CandlestickChartProps {
    data: OHLCData[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // Clear the SVG to avoid duplicate renderings
        d3.select(svgRef.current).selectAll('*').remove();

        const svg = d3
            .select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Ensure data dates are JavaScript Date objects
        data.forEach(d => {
            if (!(d.date instanceof Date)) {
                d.date = new Date(d.date);
            }
        });

        // Define x and y scales
        const x = d3
            .scaleBand() // Use scaleBand for evenly spaced bars
            .domain(data.map(d => d.date.toString())) // Unique keys for each candle
            .range([0, width])
            .padding(0.1); // Adjust spacing between candles

        const y = d3
            .scaleLinear()
            .domain([d3.min(data, d => d.low)!, d3.max(data, d => d.high)!])
            .range([height, 0]);

        // Create x and y axes
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d => d3.timeFormat('%b %d')(new Date(d))))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');

        svg.append('g').call(d3.axisLeft(y));

        // Add the wicks (high and low lines) first
        svg.selectAll('.wick')
            .data(data)
            .enter()
            .append('line')
            .attr('class', 'wick')
            .attr('x1', d => x(d.date.toString())! + x.bandwidth() / 2) // Center the wick
            .attr('x2', d => x(d.date.toString())! + x.bandwidth() / 2)
            .attr('y1', d => y(d.high))
            .attr('y2', d => y(d.low))
            .attr('stroke', 'black');

        // Add the candlestick bars after the wicks
        svg.selectAll('.candlestick')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'candlestick')
            .attr('x', d => x(d.date.toString())!) // Use string key
            .attr('y', d => y(d3.max([d.open, d.close])!))
            .attr('width', x.bandwidth()) // Use the bandwidth for consistent width
            .attr('height', d => Math.abs(y(d.open) - y(d.close)))
            .attr('fill', d => (d.open > d.close ? 'red' : 'green'));

    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default CandlestickChart;
