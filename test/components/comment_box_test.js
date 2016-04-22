import { renderComponent, expect } from '../test_helper';
import CommentBox from '../../src/components/comment_box';

describe('CommentBox', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(CommentBox);
  })

  // Testing for div class name of 'comment-box'
  it('has the correct class', () => {
    expect(component).to.have.class('comment-box');
  })

  // Testing for component to contain 'textarea'
  it('has a text area', () => {
    expect(component.find('textarea')).to.exist;
  })

  // Testing for component to contain a 'button'
  it('has a button', () => {
    expect(component.find('button')).to.exist;
  })

  // nested describe
  describe('entering some text', () => {
    beforeEach(() => {

      // stimulate chnage event of new value from changed event (tool to simulate text entered)
      component.find('textarea').simulate('change', 'new comment');
    });

    // test for value assertion
    it('shows that text in that textarea', () => {
      expect(component.find('textarea')).to.have.value('new comment')
    });

    // test for form submission
    it('when submitted, clears the input', () => {
      component.simulate('submit');
      expect(component.find('textarea')).to.have.value('')
    });
  });

})
