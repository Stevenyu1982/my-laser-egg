import * as d3 from 'd3'
import Chart from '@/libs/D3Dot'

export default class DotChart extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({mode: 'closed'});
    this._root.innerHTML = `
      <style>
        :host {  }
        .chart .axis text { font: 9px sans-serif; fill: RGB(255, 255, 255); }
        .chart .axis path,
        .chart .axis line { fill: none; stroke: RGB(230, 237, 244); stroke-width: 1.5px; shape-rendering: crispEdges; }
        .chart .axis path { display: none; }
      </style>
      <svg class="chart dot-chart"></svg>
    `;

    this.chart = new Chart({
      target: this._root.querySelector('.dot-chart'),
      keys: {
        x: 'time',
        y: 'pm25'
      }
    })
  }

  static get observedAttributes() { return ['value']; }

  attributeChangedCallback(name, oldValue, newValue, namespaceURI) {
    if (name === 'value') {
      this.chart.render(JSON.parse(newValue))
    }
  }
}

customElements.define('dot-chart', DotChart);
