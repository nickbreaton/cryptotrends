import * as d3 from 'd3'
import React, { Component } from 'react'
import { coins } from '../lib/coins'
import { CoinConsumer } from './CoinContext'

class Graph extends Component {
  render() {
    return (
      <React.Fragment>
        <svg ref={svg => this.svg = svg} className='graph' />
        <CoinConsumer>
          {state => this.graph(state) || null}
        </CoinConsumer>
      </React.Fragment>
    )
  }
  graph = ({ isLoading, points, coin }) => {
    window.requestAnimationFrame(() => {
      // do no proceed if missing data
      if (!this.svg || isLoading) return

      const svg = d3.select(this.svg)

      svg.node().innerHTML = ''

      const padding = 45
      const width = svg.node().getBoundingClientRect().width - padding
      const height = svg.node().getBoundingClientRect().height - padding

      const x = d3.scaleTime().range([padding, width])
      const y0 = d3.scaleLinear().range([height, padding])
      const y1 = d3.scaleLinear().range([height, padding])

      const priceLine = d3.line()
        .x(d => x(d.date))
        .y(d => y0(d.price))

        const interestLine = d3.line()
        .x(d => x(d.date))
        .y(d => y1(d.interest))

      const interestArea = d3.area()
        .x(d => x(d.date))
        .y0(y1(0))
        .y1(d => y1(d.interest))

      // parse dates
      points = points
        .map(point => Object.assign({}, point, {
          date: new Date(point.date)
        }))

      x.domain(d3.extent(points, d => d.date))
      y0.domain([ d3.min(points, d => d.price), d3.max(points, d => d.price) ])
      y1.domain([ d3.min(points, d => d.interest), d3.max(points, d => d.interest) ])

      interest()
      price()

      function price() {
        svg.append('path')
          .data([ points ])
          .attr('d', priceLine)
          .attr('class', 'graph__line graph__line--price')

        svg.selectAll('.a')
          .data(points)
          .enter()
          .append('circle')
          .attr('r', 3.5)
          .attr('cx', d => x(d.date))
          .attr('cy', d => y0(d.price))
          .attr('class', 'graph__line__point graph__line__point--price')
      }

      function interest() {
        svg.append('path')
          .data([ points ])
          .attr('d', interestArea)
          .attr('class', 'graph__line__area graph__line__area--interest')

        svg.append('path')
          .data([ points ])
          .attr('d', interestLine)
          .attr('class', 'graph__line graph__line--interest')

        svg.selectAll('.b')
          .data(points)
          .enter()
          .append('circle')
          .attr('r', 3.5)
          .attr('cx', d => x(d.date))
          .attr('cy', d => y1(d.interest))
          .attr('class', 'graph__line__point graph__line__point--interest')
      }
    })
  }
}

export default Graph