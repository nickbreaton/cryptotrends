import { CoinConsumer } from './CoinContext'
import { coins } from '../lib/coins'
import { WindowSize } from 'react-fns'
import * as d3 from 'd3'
import React, { Component } from 'react'
import debounce from 'lodash.debounce'

class Graph extends Component {
  initial = true

  render() {
    return (
      <WindowSize>
        {() => (
          <React.Fragment>
            <svg ref={svg => this.svg = svg} className='graph' />
            <CoinConsumer>
              {state => this.graph(state) || null}
            </CoinConsumer>
          </React.Fragment>
        )}
      </WindowSize>
    )
  }

  graph = debounce((state) => {
    window.requestAnimationFrame(() => {
      // do no proceed if missing data
      if (!this.svg || !state.points.length) return

      if (this.initial) {
        this.graphInitial(state)
        this.initial = false
      } else {
        this.graphUpdate(state)
      }
    })
  }, 1000 / 60)

  graphInitial = ({ points, coin }) => {
    const svg = d3.select(this.svg)

    svg.node().innerHTML = ''

    const padding = 45
    const width = svg.node().getBoundingClientRect().width - padding
    const height = svg.node().getBoundingClientRect().height - padding

    const x = this.x = d3.scaleTime().range([padding, width])
    const y0 = this.y0 = d3.scaleLinear().range([height, padding])
    const y1 = this.y1 = d3.scaleLinear().range([height, padding])

    const priceLine = this.priceLine = d3.line()
      .x(d => x(d.date))
      .y(d => y0(d.price))

    const interestLine = this.interestLine = d3.line()
      .x(d => x(d.date))
      .y(d => y1(d.interest))

    const interestArea = this.interestArea = d3.area()
      .x(d => x(d.date))
      .y0(y1(0))
      .y1(d => y1(d.interest))

    // parse dates
    points = points.map(point => ({
      ...point,
      date: new Date(point.date)
    }))

    x.domain(d3.extent(points, d => d.date))
    y0.domain([ 0, d3.max(points, d => d.price) ])
    y1.domain([ 0, d3.max(points, d => d.interest) ])

    const price = () => {
      svg
        .append('path')
        .attr('class', 'graph__line graph__line--price')
        .data([ points ])
        .attr('d', priceLine)

      svg
        .selectAll('.graph__line__point--price')
        .data(points)
        .enter()
        .append('circle')
        .attr('class', 'graph__line__point graph__line__point--price')
        .attr('r', 3.5)
        .attr('cx', d => x(d.date))
        .attr('cy', d => y0(d.price))
    }

    const interest = () => {
      svg.append('path')
        .attr('class', 'graph__line__area graph__line__area--interest')
        .data([ points ])
        .attr('d', interestArea)

      svg.append('path')
        .attr('class', 'graph__line graph__line--interest')
        .data([ points ])
        .attr('d', interestLine)

      svg
        .selectAll('.graph__line__point--interest')
        .data(points)
        .enter()
        .append('circle')
        .attr('r', 3.5)
        .attr('cx', d => x(d.date))
        .attr('cy', d => y1(d.interest))
        .attr('class', 'graph__line__point graph__line__point--interest')
    }

    interest()
    price()
  }

  graphUpdate = ({ points, coin }) => {
    console.log('test')

    const svg = d3.select(this.svg)

    points = points.map(point => ({
      ...point,
      date: new Date(point.date)
    }))

    this.x.domain(d3.extent(points, d => d.date))
    this.y0.domain([ 0, d3.max(points, d => d.price) ])
    this.y1.domain([ 0, d3.max(points, d => d.interest) ])

    svg.select('.graph__line--price')
      .data([ points ])
      .transition()
      .attr('d', this.priceLine)

    svg
      .selectAll('.graph__line__point--price')
      .data(points)
      .transition()
      .attr('cx', d => this.x(d.date))
      .attr('cy', d => this.y0(d.price))

    svg.select('.graph__line--interest')
      .data([ points ])
      .transition(1000)
      .attr('d', this.interestLine)

    svg.select('.graph__line__area--interest')
      .data([ points ])
      .transition()
      .attr('d', this.interestArea)

    svg.selectAll('.graph__line__point--interest')
      .data(points)
      .transition()
      .attr('cx', d => this.x(d.date))
      .attr('cy', d => this.y1(d.interest))
  }
}

export default Graph