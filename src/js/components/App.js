var React = require('react');
var ReactDOM = require('react-dom');
var ButtonFrame = require('./ButtonFrame.js');
var StarsFrame = require('./StarsFrame.js');
var AnswerFrame = require('./AnswerFrame.js');
var NumbersFrame = require('./NumbersFrame.js');

var App = React.createClass({
    getInitialState: function () {
        return {
            selectedNumbers: [],
        numberOfStars:Math.floor(Math.random()*9)+1
        }
    },
    render: function () {

        return (
            <div id="game">
                <h2>Play Nine</h2>
                <hr/>
                <div className="clearfix">
                    <StarsFrame numberOfStars={this.state.numberOfStars}/>
                    <ButtonFrame selectedNumbers={this.state.selectedNumbers}/>
                    <AnswerFrame unselectNumber={this.unselectNumber} selectedNumbers={this.state.selectedNumbers}/>
                    <NumbersFrame selectNumber={this.selectNumber} selectedNumbers={this.state.selectedNumbers} clickNumber={this.clickNumber}/>
                </div>
            </div>
        )
    },
    clickNumber:function(clickedNumber){
        if(this.state.selectedNumbers.indexOf(clickedNumber)) {
            this.setState({
                selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)
            })
        }
    },
    unselectNumber:function(clickedNumber){
        var selectedNumbers=this.state.selectedNumbers;
        indexOfNumber=selectedNumbers.indexOf(clickedNumber);
        selectedNumbers.splice(indexOfNumber,1);
        this.setState({
            selectedNumber:selectedNumbers
        })
    }
});

module.exports = App;