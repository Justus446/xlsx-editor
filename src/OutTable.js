import React, { Component } from 'react';


export default class OutTable extends Component {

	constructor(props) {
        super(props);
        this.state = {

        }
    }

	render() {
        return (
            <div className={this.props.className}>
                <table className={this.props.tableClassName}  >
                    <tbody>
                              <tr>
                                {this.props.withZeroColumn && !this.props.withoutRowNum && <th className={this.props.tableHeaderRowClass || ""}></th>}
                                {this.props.columns.map((c) => (
                                  <th key={c.key} className={c.key === -1 ? this.props.tableHeaderRowClass : ""}>
                                    {c.key === -1 ? "" : c.name}
                                  </th>
                                ))}
                              </tr>
                              {this.props.data.map((r, i) => (
                                <tr key={i}>
                                  {!this.props.withoutRowNum && <td key={i} className={this.props.tableHeaderRowClass}>{this.props.renderRowNum ? this.props.renderRowNum(r, i) : i}</td>}
                                  {this.props.columns.map((c) => (
                                    <td key={c.key}>
                                      <input type="text" value={r[c.key]} onChange={(e) => this.props.handleCellChange(e.target.value, i, c.key)} />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                  </tbody>
                </table>
            </div>
        );
    }
}