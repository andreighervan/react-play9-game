var React = require('react');
var ReactDOM = require('react-dom');

var ButtonFrame = React.createClass({

    render: function () {
var disabled;
        disabled=(this.props.selectedNumbers.length===0);
        return (
            <div id="button-frame">
               <button className="btn btn-primary btn-lg" disabled={disabled}>=</button>
            </div>
        )
    }
});

module.exports = ButtonFrame;