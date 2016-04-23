import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';


// Set up testing environment to run like a browser in the command line
// create simulated html inside the comandline using fake DOM
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
// assign jquery to local fake DOM rather than the real DOM
const $ = jquery(global.window);

// build 'renderComponent' helper that should render a given react class
// ComponentClass is refer to the compoent class we build
function renderComponent(ComponentClass, props, state){
  // making a instance of the class through 'componentInstance'
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props}/>
    </Provider>
  );

  // produces HTML by passing the 'componentInstance' through ReactDOM
  // wrap with jquery element for methods within jquery
  return $(ReactDOM.findDOMNode(componentInstance))
}

// Build helper for simulating events
// create jquery function simulate - then the function will be available
$.fn.simulate = function(eventName, value){
  // update the value of the event
  if (value) {
    this.val(value);
  }
  // 'this' refer to the selected html element $('<div>')
  // pass in the change event and invoke the function with this
  TestUtils.Simulate[eventName](this[0]);
}

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };
