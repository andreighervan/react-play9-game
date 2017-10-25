var React = require('react');
var ReactDOM = require('react-dom');
var ButtonFrame = require('./ButtonFrame.js');
var StarsFrame = require('./StarsFrame.js');
var AnswerFrame = require('./AnswerFrame.js');
var NumbersFrame = require('./NumbersFrame.js');
var DoneFrame = require('./DoneFrame.js');

var App = React.createClass({
    getInitialState: function () {
        return {
            selectedNumbers: [],
            numberOfStars: Math.floor(Math.random() * 9) + 1,
            correct: null,
            usedNumbers: [],
            redraws: 5,
            doneStatus: null
        }
    },
    render: function () {
        var correct = this.state.correct;
        var usedNumbers = this.state.usedNumbers,
            numberOfStars = this.state.numberOfStars,
            redraws = this.state.redraws,
            doneStatus = this.state.doneStatus,
            bottomFrame;
        if (doneStatus) {
            bottomFrame = <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}/>;
        } else {
            bottomFrame = <NumbersFrame usedNumbers={usedNumbers} selectNumber={this.selectNumber}
                                        selectedNumbers={this.state.selectedNumbers} clickNumber={this.clickNumber}/>;
        }
        return (
            <div id="game">
                <h2>Play Nine</h2>
                <hr/>
                <div className="clearfix">
                    <StarsFrame numberOfStars={numberOfStars}/>
                    <ButtonFrame redraws={redraws} redraw={this.redraw} acceptAnswer={this.acceptAnswer}
                                 checkAnswer={this.checkAnswer} correct={correct}
                                 selectedNumbers={this.state.selectedNumbers}/>
                    <AnswerFrame unselectNumber={this.unselectNumber} selectedNumbers={this.state.selectedNumbers}/>
                    {bottomFrame}
                </div>
            </div>
        )
    },
    selectNumber: function (clickedNumber) {
        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
            this.setState({
                selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
                correct: null
            })
        }
    },
    checkAnswer: function () {
        var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
        this.setState({
            correct: correct
        })
    },
    acceptAnswer: function () {
        var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
        this.setState({
            selectedNumbers: [],
            usedNumbers: usedNumbers,
            correct: null,
            numbersOfStars: Math.floor(Math.random() * 9) + 1
        },function(){this.updateDoneStatus()})
    },
    sumOfSelectedNumbers: function () {
        return this.state.selectedNumbers.reduce(function (p, n) {
            return p + n;
        }, 0)
    },
    unselectNumber: function (clickedNumber) {
        var selectedNumbers = this.state.selectedNumbers;
        indexOfNumber = selectedNumbers.indexOf(clickedNumber);
        selectedNumbers.splice(indexOfNumber, 1);
        this.setState({
            selectedNumber: selectedNumbers,
            correct: null
        })
    },
    redraw: function () {
        if (this.state.redraws > 0) {
            this.setState({
                numbersOfStars: Math.floor(Math.random() * 9) + 1,
                correct: null,
                selectedNumbers: [],
                redraws: this.state.redraws - 1
            },function(){this.updateDoneStatus()})
        }
    },
    updateDoneStatus:function(){
        if(this.state.usedNumbers.length===9){
            this.setState({
                doneStatus:'Done Nice'
            });
            return;
        }
        if(!this.possibleSolution()&&this.state.redraws===0){
            this.setState({
                doneStatus:'Game over!'
            })
        }
    },

    possibleSolution:function(){
        var numberOfStars=this.state.numberOfStars,
        possibleNumbers=[],
            usedNumbers=this.state.usedNumbers;
        for(var i=1;i<9;i++){
            if(usedNumbers.indexOf(i)<0){
                possibleNumbers.push(i);
            }
        }
        return possibleCombinationSum(possibleNumbers,numberOfStars);
    }
});
function possibleCombinationSum(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;
        for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
}

module.exports = App;