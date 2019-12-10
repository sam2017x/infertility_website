import React, { useState } from 'react';
import fbService from '../util/api/users';
import translate from '../util/localization/i18n'

const FeedbackForm = () => {
  const [toggle, setToggle] = useState(true);
  const [nick, setNick] = useState('');
  const [feedback, setFeedback] = useState('');
  const displayForm = { display: toggle ? 'none' : '' };
  const text = toggle ? translate('fb_1') : translate('fb_2');

  function escapeHtml(text) {
    let map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    };
  
    return text.replace(/[&<>"]/g, function(m) { return map[m]; });
  }


  const handleSubmit = () => {
    const safe = escapeHtml(feedback.trim());
    const data = {
      name: 'Filler',
      message: safe
    }
    fbService.send_feedback(data).then(() => {alert(translate('fb_5')); setFeedback(""); }).catch(error => alert(error.message))
  };

  const fb = () => {
    if (toggle === false) {
      document.getElementById('chartanchor').scrollIntoView()
    }
    else {
      const scrollOptions = {
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth'
      }
      setTimeout(() => {
        window.scrollTo(scrollOptions);
      }, 200)
    }
    setToggle(!toggle);
  }


  return (
    <div className="feedback-form">
      <div className="toggle-fb" role="button" tabIndex={0} onClick={() => fb()} onKeyDown={() => fb()}>{text}</div>
      <div style={displayForm}>
        <form className="feedback-fields">
          <label htmlFor="feedback">
          {translate('fb_3')}
            <textarea id="feedback" value={feedback} onChange={e => setFeedback(e.target.value)} />
          {feedback.trim().length}
          </label>
          <input type="button" disabled={(feedback.trim() === "") ? true : (feedback.trim().length > 1000) ? true : false} className="fb-submit" value={translate('fb_4')} onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
