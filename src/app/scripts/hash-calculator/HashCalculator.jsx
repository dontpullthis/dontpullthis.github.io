import cryptojs from 'crypto-js';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

import CopyableField from '../../shared/blocks/CopyableField';


export class HashCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      hashes: {
        md5: '',
        sha1: '',
        sha224: '',
        sha256: '',
        sha3: '',
        sha384: '',
        sha512: '',
      }
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  recalculateHashes() {
    const { input } = this.state;

    this.setState({
      hashes: {
        md5: cryptojs.MD5(input).toString(),
        sha1: cryptojs.SHA1(input).toString(),
        sha224: cryptojs.SHA224(input).toString(),
        sha256: cryptojs.SHA256(input).toString(),
        sha3: cryptojs.SHA3(input).toString(),
        sha384: cryptojs.SHA384(input).toString(),
        sha512: cryptojs.SHA512(input).toString(),
      }
    });
  }

  componentDidMount() {
    this.recalculateHashes();
  }

  async onInputChange(e) {
    await this.setState({ input: e.target.value });
    this.recalculateHashes();
  }

  render() {
    const { hashes } = this.state;

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Hash calculator
          </h3>
        </div>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
              <h4 className="card-title">Input</h4>
                <form>
                  <Form.Group>
                    <label htmlFor="scriptsHashClaculatorInputData">Please provide your input text here</label>
                    <textarea
                      className="form-control"
                      id="scriptsHashClaculatorInputData"
                      rows="10"
                      value={this.state.input}
                      onChange={this.onInputChange}></textarea>
                  </Form.Group>
                </form>
              </div>  
            </div>
          </div>

          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Calculated hashes</h4>
                <form>
                  <CopyableField
                    id="scriptsHashClaculatorHashMd5"
                    value={hashes.md5}
                    label="MD5"
                    readOnly={true}
                  />
                  <CopyableField
                    id="scriptsHashClaculatorHashSha1"
                    value={hashes.sha1}
                    label="SHA1"
                    readOnly={true}
                  />
                  <CopyableField
                    id="scriptsHashClaculatorHashSha224"
                    value={hashes.sha224}
                    label="SHA224"
                    readOnly={true}
                  />
                  <CopyableField
                    id="scriptsHashClaculatorHashSha256"
                    value={hashes.sha256}
                    label="SHA256"
                    readOnly={true}
                  />
                  <CopyableField
                    id="scriptsHashClaculatorHashSha3"
                    value={hashes.sha3}
                    label="SHA3"
                    type="textarea"
                    readOnly={true}
                  />
                  <CopyableField
                    id="scriptsHashClaculatorHashSha384"
                    value={hashes.sha384}
                    label="SHA384"
                    readOnly={true}
                  />
                  <CopyableField
                    id="scriptsHashClaculatorHashSha512"
                    value={hashes.sha512}
                    label="SHA512"
                    type="textarea"
                    readOnly={true}
                  />
                </form>
              </div>  
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HashCalculator;