import React, { Component, createRef } from 'react';

import ProgressBar from 'progressbar.js';

class Shape extends Component{
  
  constructor(){
    
    super();
    
    this.progressBar = createRef();
    
    this.shape;

  }
  
  
  
  componentDidMount(){
    
    let ShapeType, shape, text_val;
    
    if(this.props.type === 'line'){
      ShapeType = ProgressBar.Line;
    } else if(this.props.type === 'semicircle'){
      ShapeType = ProgressBar.SemiCircle;
    } else{
      ShapeType = ProgressBar.Circle;
    }
    
    text_val = typeof this.props.options.text === 'string' ? {value: this.props.options.text} : this.props.options.text;
    
    let input_options = this.props.options;
    
    input_options.text = text_val;

    this.shape = new ShapeType(this.progressBar.current, input_options, this.props.callback);
    
    
    // When a page loads, componentDidMount fires before readyState is set to complete. Animations then fire before some of the 
    // visible content is loaded, which results in visible jank and lack of animation.
    // This will check that the document is completely loaded and ready before firing the animation.
    let chkRdy = setInterval(() => {

      if(document.readyState === 'complete'){

        this.shape.animate(typeof this.props.progress !== 'undefined' ? this.props.progress : 0.5);
        
        clearInterval(chkRdy);

      }

    }, 50)

    
  }

  componentDidUpdate(){
    this.shape.animate(typeof this.props.progress !== 'undefined' ? this.props.progress : 0.5);
  }
  
  render(){

    let container_class = typeof this.props.container_class !== 'undefined' ? this.props.container_class : '';
    
    return(
    
      <div
        ref={this.progressBar}
        className={`progressbar-container ${container_class}`}
        style={this.props.container_style}
      ></div>
    
    );
    
  }
  
}

const Circle = props => (
  
  <Shape type='circle' container_class={props.container_class} options={props.options} {...props} />
  
);

const SemiCircle = props => (
  
  <Shape type='semicircle' container_class={props.container_class} options={props.options} {...props} />
  
);

const Line = props => (
  
  <Shape type='line' container_class={props.container_class} options={props.options} {...props} />
  
);

export { Circle, SemiCircle, Line };