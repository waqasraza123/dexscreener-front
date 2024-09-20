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

        // Use d3.scaleTime for x-axis
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date) as [Date, Date]) // Extent of the dates
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([d3.min(data, d => d.low)!, d3.max(data, d => d.high)!])
            .range([height, 0]);

        // Dynamically calculate the width of each candle based on the data length
        const candleWidth = Math.max(2, width / data.length - 1); // Adjust the -1 to change spacing

        // Create x and y axes
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x)
                .ticks(d3.timeMonth.every(1))  // Ticks every month
                .tickFormat(d => d3.timeFormat('%b %d')(new Date(d as Date))))
            .selectAll('text')
            .attr('transform', 'rotate(-65)')
            .style('text-anchor', 'end');

        svg.append('g').call(d3.axisLeft(y));

        // Add the wicks (high and low lines) first
        svg.selectAll('.wick')
            .data(data)
            .enter()
            .append('line')
            .attr('class', 'wick')
            .attr('x1', d => x(d.date)! + candleWidth / 2) // Center the wick in the candle
            .attr('x2', d => x(d.date)! + candleWidth / 2)
            .attr('y1', d => y(d.high))
            .attr('y2', d => y(d.low))
            .attr('stroke', 'black');

        // Add the candlestick bars after the wicks
        svg.selectAll('.candlestick')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'candlestick')
            .attr('x', d => x(d.date)!) // Use the x-scale to position the candles
            .attr('y', d => y(d3.max([d.open, d.close])!))
            .attr('width', candleWidth) // Dynamic candle width
            .attr('height', d => Math.abs(y(d.open) - y(d.close)))
            .attr('fill', d => (d.open > d.close ? 'red' : 'green'));

    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default CandlestickChart;
