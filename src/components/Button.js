import React from 'react';
import MathJax from 'react-mathjax2';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  onMouseDown() {
    const { arg, handler } = this.props;
    handler(arg)
  }
  
  render() {
    return (
      <button
        name={this.props.name}
        onMouseDown={this.onMouseDown}
        className={this.props.className}>
        <MathJax.Context input="ascii">
          <MathJax.Node inline>{this.props.content}</MathJax.Node>
        </MathJax.Context>
      </button>
    )
  }
}

export default Button;
