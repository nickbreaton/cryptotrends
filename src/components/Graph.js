import { CoinConsumer } from './CoinContext'
import { coins } from '../lib/coins'
import * as d3 from 'd3'
import debounce from 'lodash.debounce'
import React, { Component } from 'react'

class Graph extends Component {
  debounceRate = 1000 / 60
  initial = true
  padding = 75
  pointRadius = 3.5

  get duration() {
    return this.initial ? 0 : 333
  }

  init() {
    this.svg.innerHTML = ''
    const svg = d3.select(this.svg)
    const width = svg.node().getBoundingClientRect().width - this.padding
    const height = svg.node().getBoundingClientRect().height - this.padding

    // SCALES

    this.x = d3.scaleTime().range([this.padding, width])
    this.y0 = d3.scaleLinear().range([height, this.padding])
    this.y1 = d3.scaleLinear().range([height, this.padding])

    // AXES

    this.bottomAxisElement = svg.append('g')
      .style('transform', `translateY(calc(${height}px + 1rem))`)
      .attr('class', 'graph__axis')

    this.rightAxisElement = svg.append('g')
      .style('transform', `translateX(calc(${width}px + 1rem))`)
      .attr('class', 'graph__axis')

    this.leftAxisElement = svg.append('g')
      .style('transform', `translateX(calc(${this.padding}px - 1rem))`)
      .attr('class', 'graph__axis')

    // DATA

    this.priceLine = d3.line()
      .x(d => this.x(d.date))
      .y(d => this.y0(d.price))

    this.interestLine = d3.line()
      .x(d => this.x(d.date))
      .y(d => this.y1(d.interest))

    this.interestArea = d3.area()
      .x(d => this.x(d.date))
      .y0(this.y1(0))
      .y1(d => this.y1(d.interest))

    // INTEREST

    this.interestAreaElement = svg
      .append('path')
      .attr('class', 'graph__line__area graph__line__area--interest')

    this.interestLineElement = svg
      .append('path')
      .attr('class', 'graph__line graph__line--interest')

    svg
      .selectAll('.graph__line__point--interest')
      .data(this.points)
      .enter()
      .append('circle')
      .attr('r', this.pointRadius)
      .attr('class', 'graph__line__point graph__line__point--interest')

    // PRICE

    this.priceLineElement = svg
      .append('path')
      .attr('class', 'graph__line graph__line--price')

    svg
      .selectAll('.graph__line__point--price')
      .data(this.points)
      .enter()
      .append('circle')
      .attr('r', this.pointRadius)
      .attr('class', 'graph__line__point graph__line__point--price')
  }

  update = debounce(({ points }) => {
    if (points.length === 0) {
      // skip render
      return
    }

    this.points = points.map(point => ({
      ...point,
      date: new Date(point.date)
    }))

    if (this.initial) {
      this.init()
    }

    const svg = d3.select(this.svg)

    // SCALE

    this.x.domain(d3.extent(this.points, d => d.date))
    this.y0.domain([ 0, d3.max(this.points, d => d.price) ])
    this.y1.domain([ 0, d3.max(this.points, d => d.interest) ])

    // AXES

    this.bottomAxisElement.call(
      d3.axisBottom(this.x)
    )

    this.leftAxisElement.call(
      d3.axisLeft(this.y0)
    )

    this.rightAxisElement.call(
      d3.axisRight(this.y1)
    )

    // INTEREST

    this.interestAreaElement
      .data([ this.points ])
      .transition()
      .duration(this.duration)
      .attr('d', this.interestArea)

    this.interestLineElement
      .data([ this.points ])
      .transition()
      .duration(this.duration)
      .attr('d', this.interestLine)

    svg.selectAll('.graph__line__point--interest')
      .data(this.points)
      .transition()
      .duration(this.duration)
      .attr('cx', d => this.x(d.date))
      .attr('cy', d => this.y1(d.interest))

    // PRICE

    this.priceLineElement
      .data([ this.points ])
      .transition()
      .duration(this.duration)
      .attr('d', this.priceLine)

    svg.selectAll('.graph__line__point--price')
      .data(this.points)
      .transition()
      .duration(this.duration)
      .attr('cx', d => this.x(d.date))
      .attr('cy', d => this.y0(d.price))

    this.initial = false
  }, this.debounceRate)

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.initial = true
      this.forceUpdate()
    })
  }

  render() {
    return (
      <React.Fragment>
        <svg ref={svg => this.svg = svg} className='graph' />
        <CoinConsumer>
          {state => {
            this.update(state)
            return null
          }}
        </CoinConsumer>
      </React.Fragment>
    )
  }
}

export default Graph