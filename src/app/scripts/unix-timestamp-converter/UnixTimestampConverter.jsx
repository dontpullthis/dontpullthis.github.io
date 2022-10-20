import { DateTime } from 'luxon';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';



import CopyableField from '../../shared/blocks/CopyableField';

export class UnixTimestampConverter extends Component {
  constructor(props) {
    super(props);

    this.onUnixTimestampChanged = this.onUnixTimestampChanged.bind(this);
    this.onDateTimeChanged = this.onDateTimeChanged.bind(this);
    this.onDateTimeFormatChanged = this.onDateTimeFormatChanged.bind(this);

    this.state = {
      date: DateTime.now(),
      unixTimestamp: '',
      dateTime: '',
      dateTimeFormat: 'yyyy-LL-dd HH:mm:ss.SSS (ZZZ)',
    }
  }

  componentDidMount() {
    const { date, dateTimeFormat } = this.state;
    this.setState({
      unixTimestamp: Math.round(date.toMillis()).toString(),
      dateTime: date.toFormat(dateTimeFormat),
    });
  }

  onUnixTimestampChanged(e) {
    const { dateTimeFormat } = this.state;
    const { value: unixTimestamp } = e.target;
    const date = DateTime.fromMillis(parseInt(unixTimestamp));

    this.setState({
      date,
      dateTime: date.toFormat(dateTimeFormat),
      unixTimestamp,
    });
  }

  onDateTimeChanged(e) {
    const { value: dateTime } = e.target;
    const { dateTimeFormat } = this.state;
    const date = DateTime.fromFormat(dateTime, dateTimeFormat);

    this.setState({
      date,
      dateTime,
      unixTimestamp: Math.round(date.toMillis()).toString(),
    });
  }

  onDateTimeFormatChanged(e) {
    const { date } = this.state;
    const { value: dateTimeFormat } = e.target;
    this.setState({
      dateTimeFormat,
      dateTime: date.toFormat(dateTimeFormat),
    });
  }

  render() {
    const { unixTimestamp, dateTime, dateTimeFormat } = this.state;

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Unix Timestamp Converter
          </h3>
        </div>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
              <h4 className="card-title">Parameters</h4>
                <form>
                  <Form.Group>
                    <label htmlFor="scriptsUnitTimstampConverterTimestamp">Unix timestamp (milliseconds)</label>
                    <CopyableField
                        id={`scriptsUnitTimstampConverterTimestamp`}
                        onChange={this.onUnixTimestampChanged}
                        value={unixTimestamp}
                    />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="scriptsUnitTimstampConverterDateTime">Date and time</label>
                    <CopyableField
                        id={`scriptsUnitTimstampConverterDateTime`}
                        onChange={this.onDateTimeChanged}
                        value={dateTime}
                    />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="scriptsUnitTimstampConverterDateTimeFormat">
                      Date and time format (check the&nbsp;
                      <a
                        href="https://github.com/moment/luxon/blob/master/docs/formatting.md#table-of-tokens"
                        target="_blank"
                        rel="noopener noreferrer">Luxon reference</a>)</label>
                    <CopyableField
                        id={`scriptsUnitTimstampConverterDateTimeFormat`}
                        onChange={this.onDateTimeFormatChanged}
                        value={dateTimeFormat}
                    />
                  </Form.Group>
                </form>
              </div>  
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UnixTimestampConverter;