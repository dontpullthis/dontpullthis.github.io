import genPass from 'generate-password';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

import CopyableField from '../../shared/blocks/CopyableField';

const MIN_MAX_VAL = {
    amount: [1, 100],
    length: [1, 100],
}

const Passwords = props => (props.passwords.map((password, index) => {
  return <CopyableField
      id={`scriptsPasswordGeneratorPassword${index}`}
      value={password}
      key={index}
      readOnly={true}
  />
}));

export class PasswordGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isValid: true,
        params: {
            amount: '10',
            length: '10',
            lowercase: true,
            uppercase: true,
            numbers: true,
            symbols: true,
        },
        passwords: [],
    };
    this.generatePasswords = this.generatePasswords.bind(this);
    this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
    this.onTextChanged = this.onTextChanged.bind(this);
  }

  componentDidMount() {
    this.generatePasswords();
  }

  async onCheckboxChanged(e) {
      const paramName = e.target.getAttribute('data-name');
      await this.setState({params: Object.assign({}, this.state.params, { [paramName]: e.target.checked })});
      this.generatePasswords();
  }

  async onTextChanged(e) {
    const paramName = e.target.getAttribute('data-name');
    const { value } = e.target;

    if (!(paramName in MIN_MAX_VAL)) {
        return;
    }

    await this.setState({params: Object.assign({}, this.state.params, { [paramName]: value })});
    this.generatePasswords();
  }

  getNumericParams() {
    const params = {};

    ['amount', 'length'].forEach(paramName => {
      const [minValue, maxValue] = MIN_MAX_VAL[paramName];
      let value = this.state.params[paramName];

      if (!/^[0-9]+$/.test(value)) {
        throw new Error('Invalid param');
      }

      value = parseInt(value);
      if (isNaN(value) || value < minValue || value > maxValue) {
        throw new Error('Invalid param');
      }
      params[paramName] = value;
    });

    return params;
  }

  async generatePasswords() {
    let [amount, length] = [0, 0];
    try {
      ({ amount, length } = this.getNumericParams());
      this.setState({ isValid: true });
    } catch (e) {
      this.setState({ isValid: false });
      return;
    }

    let { lowercase, uppercase, numbers, symbols } = this.state.params;

    if (!(lowercase || uppercase || numbers || symbols)) {
        lowercase = uppercase = numbers = symbols = true;
        await this.setState({
          params: Object.assign({}, this.state.params, {
            uppercase,
            lowercase,
            numbers,
            symbols
          })
        });
    }

    this.setState({
        passwords: genPass.generateMultiple(amount, {
            length,
            uppercase,
            lowercase,
            numbers,
            symbols,
        })
    });
  }

  render() {
    const { params } = this.state;

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Password generator
          </h3>
        </div>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
              <h4 className="card-title">Parameters</h4>
                <form>
                  <Form.Group>
                    <label htmlFor="scriptsPasswordGeneratorAmount">Amount({MIN_MAX_VAL.length[0]}-{MIN_MAX_VAL.length[1]})</label>
                    <Form.Control
                        type="text"
                        className="form-control"
                        id="scriptsPasswordGeneratorAmount"
                        value={params.amount}
                        onChange={this.onTextChanged}
                        data-name="amount"
                        />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="scriptsPasswordGeneratorLength">Password length ({MIN_MAX_VAL.length[0]}-{MIN_MAX_VAL.length[1]})</label>
                    <Form.Control
                        type="text"
                        className="form-control"
                        id="scriptsPasswordGeneratorLength"
                        value={params.length}
                        onChange={this.onTextChanged}
                        data-name="length"
                        />
                  </Form.Group>
                  <Form.Group>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" data-name="lowercase" onChange={this.onCheckboxChanged}
                                id="scriptsPasswordGeneratorLowercase" value="lowercase" checked={params.lowercase} />
                            <i className="input-helper"></i>
                            Lowercase letters
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" data-name="uppercase" onChange={this.onCheckboxChanged}
                                id="scriptsPasswordGeneratorUppercase" checked={params.uppercase} />
                            <i className="input-helper"></i>
                            Uppercase letters
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" data-name="numbers" onChange={this.onCheckboxChanged}
                                id="scriptsPasswordGeneratorNumbers" checked={params.numbers} />
                            <i className="input-helper"></i>
                            Numbers
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" data-name="symbols" onChange={this.onCheckboxChanged}
                                id="scriptsPasswordGeneratorSymbols" checked={params.symbols} />
                            <i className="input-helper"></i>
                            Symbols
                        </label>
                    </div>
                    <button type="button" className="btn btn-primary btn-icon-text" onClick={this.generatePasswords}>
                        <i className="mdi mdi-refresh btn-icon-prepend"></i>
                        Generate again
                      </button>
                  </Form.Group>
                </form>
              </div>  
            </div>
          </div>

          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Passwords</h4>
                <form>
                    { this.state.isValid ? <Passwords passwords={this.state.passwords} /> : <p className="text-danger">Please check your input</p> }
                </form>
              </div>  
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PasswordGenerator;