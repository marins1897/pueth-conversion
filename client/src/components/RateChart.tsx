/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import type { Rate } from "../types/index";

interface Props {
  data: Rate[];
}

export const RateChart = ({ data }: Props) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data.length || !ref.current) return;
    const isMobile = window.innerWidth <= 600;

    const margin = { top: 20, right: 50, bottom: 40, left: 60 };
    const container = ref.current?.parentElement;

    const width = container ? container.offsetWidth - margin.left - margin.right : 800;
    const height = Math.round(width * (isMobile ? 0.75 : 0.25)); 

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    svg
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

    const parsedData = data.map(d => ({
      ...d,
      date: new Date(d.timestamp),
    }));

    const tickDates = parsedData.map(d => d.date);

    const x = d3.scaleTime()
      .domain(d3.extent(parsedData, d => d.date) as [Date, Date])
      .range([0, width]);

    const yExtent = d3.extent(parsedData, d => d.rate) as [number, number];
    const yPadding = (yExtent[1] - yExtent[0]) * 0.1 || 0.01;

    const y = d3.scaleLinear()
      .domain([yExtent[0] - yPadding, yExtent[1] + yPadding])
      .nice()
      .range([height, 0]);

    const line = d3.line<any>()
      .x(d => x(d.date))
      .y(d => y(d.rate))
      .curve(d3.curveMonotoneX);

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Axis
    g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(
      d3.axisBottom(x)
        .tickValues(tickDates)
        .tickFormat((domainValue) => d3.timeFormat("%H:%M")(domainValue as Date)));

    // Y Axis
    g.append("g")
    .call(
      d3.axisLeft(y)
        .ticks(isMobile ? 4 : 8)
        .tickFormat(d3.format(".4f"))
    );

    // Line Path
    g.append("path")
      .datum(parsedData)
      .attr("fill", "none")
      .attr("stroke", "#b2d141")
      .attr("stroke-width", 2)
      .attr("d", line);

    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("font-size", isMobile ? "10px" : "12px")
      .style("padding", isMobile ? "4px 8px" : "8px 12px")
      .style("background", "#e2e3de")
      .style("color", "#1e1e1e")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("box-shadow", "0 2px 5px rgba(214, 168, 168, 0.1)")
      .style("pointer-events", "none")
      .style("opacity", 0);

    g.selectAll("circle")
      .data(parsedData)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.date))
      .attr("cy", d => y(d.rate))
      .attr("r", 4)
      .attr("fill", "#b2d141")
      .on("mouseover", function (event, d) {
        tooltip
          .html(`
            <strong>${d3.timeFormat("%Y-%m-%d %H:%M")(d.date)}</strong><br/>
            Rate: ${d.rate.toFixed(10)}
          `)
          .style("left", `${event.pageX + 12}px`)
          .style("top", `${event.pageY - 30}px`)
          .transition()
          .duration(100)
          .style("opacity", 1);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", `${event.pageX + 12}px`)
          .style("top", `${event.pageY - 30}px`);
      })
      .on("mouseout", function () {
        tooltip.transition().duration(200).style("opacity", 0);
      });
      

    return () => {
      tooltip.remove();
    };
  }, [data]);

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <svg ref={ref} style={{ display: "block", width: "100%", height: "auto" }} />
    </div>
  );
};
