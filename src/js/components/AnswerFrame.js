var React = require('react');
var ReactDOM = require('react-dom');

var AnswerFrame = React.createClass({

    render: function () {
        var props = this.props;
        var selectedNumbers = props.selectedNumbers.map(function (i) {
            return (
                <span onClick={props.unselectNumber.bind(null,i)}>{i}</span>
            )
        });
        return (
            <div id="answer-frame">
                <div className="well">
                    <div className="answer">{selectedNumbers}</div>
                </div>
            </div>
        )
    }
});

module.exports = AnswerFrame;