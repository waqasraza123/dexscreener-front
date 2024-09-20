import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { BubbleData } from '../interfaces/utils/bubbleDataGenerator';

interface BubbleChartProps {
    data: BubbleData[];
}

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
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

        // Define scales for x, y, and radius
        const x = d3.scaleLinear().domain([0, 100]).range([0, width]);
        const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
        const r = d3.scaleSqrt().domain([0, 25]).range([0, 40]);

        // Define a fixed color palette
        const colorPalette = ['#FF5733', '#FFBD33', '#33FF57', '#33A7FF'];  // Colors for ranking

        // Sort the data by percentage in descending order
        const sortedData = [...data].sort((a, b) => b.percentage - a.percentage);

        // Assign colors based on ranking
        sortedData.forEach((d, i) => {
            d.color = colorPalette[i % colorPalette.length];  // Loop through colors
        });

        // Create x and y axes
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append('g').call(d3.axisLeft(y));

        // Add bubbles
        svg.selectAll('circle')
            .data(sortedData)
            .enter()
            .append('circle')
            .attr('cx', d => x(d.x))
            .attr('cy', d => y(d.y))
            .attr('r', d => r(d.r))
            .attr('fill', d => d.color)  // Assign the ranked color
            .attr('opacity', 0.7);

        // Add percentage text inside each bubble
        svg.selectAll('text')
            .data(sortedData)
            .enter()
            .append('text')
            .attr('x', d => x(d.x))
            .attr('y', d => y(d.y) + 4)  // Center the text inside the bubble
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .style('font-size', '10px')
            .text(d => `${d.percentage.toFixed(1)}%`);  // Display percentage

    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default BubbleChart;