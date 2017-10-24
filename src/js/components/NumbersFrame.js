var React = require('react');
var ReactDOM = require('react-dom');
var AnswerFrame = require('./AnswerFrame.js');

var NumbersFrame = React.createClass({

    render: function () {
        var numbers = [],className,selectedNumbers=this.props.selectedNumbers,clickNumber=this.props.clickNumber,
            selectNumber=this.props.selectNumber;
        for (var i = 1; i <= 9; i++) {
            className="numbers selected-"+(selectedNumbers.indexOf(i)>=0);

            numbers.push(
                <div className={className} onClick={clickNumber.bind(null,i)}>{i}</div>
            )
        }
        return (
            <div id="numbers-frame">
                {numbers}
            </div>
        )
    }
});

module.exports = NumbersFrame;