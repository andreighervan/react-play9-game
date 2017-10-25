var React = require('react');
var ReactDOM = require('react-dom');

var StarsFrame = React.createClass({

    render: function () {
var numberOfStars=Math.floor(Math.random()*9)+1;
        var stars=[];
        for(var i=0;i<numberOfStars;i++){
            stars.push(
                <span className="glyphicon glyphicon-star"></span>
            )
        }
        return (
            <div id="stars-frame">
              <div className="well">
                  {stars}
                  </div>
            </div>
        )
    }
});

module.exports = StarsFrame;