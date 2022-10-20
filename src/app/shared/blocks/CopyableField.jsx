import propTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyableField = props => {
    const [leftLen, rightLen] = props.label === null ? [0, 12] : [2, 10];
    const { onChange, readOnly } = props;

    return <Form.Group className="row">
        { leftLen > 0 ? <label htmlFor={props.id} className="col-sm-2 col-form-label">{props.label}</label> : null }
        <div className={`col-sm-${rightLen}`}>
            <div className="input-group">
                {
                props.type === 'textarea' ?
                <textarea
                    className="form-control"
                    rows="4"
                    id={props.id}
                    value={props.value}
                    readOnly={readOnly}
                    onChange={onChange}></textarea> :
                <Form.Control
                    type="text"
                    className="form-control"
                    id={props.id}
                    value={props.value}
                    readOnly={readOnly}
                    onChange={onChange}
                    />
                }
                <div className="input-group-append">
                <CopyToClipboard text={props.value}>
                    <button className="btn btn-sm btn-primary" type="button">
                    <i className="mdi mdi-content-copy"></i>
                    </button>
                </CopyToClipboard>
                </div>
            </div>
        </div>
    </Form.Group>
};

CopyableField.propTypes = {
    id: propTypes.string.isRequired,
    onChange: propTypes.func,
    readOnly: propTypes.bool,
    value: propTypes.string.isRequired,
    type: propTypes.string,
};

CopyableField.defaultProps = {
    label: null,
    onChange: () => {},
    readOnly: false,
    type: 'text',
};

export default CopyableField;
  