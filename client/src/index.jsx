import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import Chart from './components/Chart';
import Form from './views/Form';
import Api from './util/api';
import Navibar from './views/Navibar';
import Login from './views/Login';
import About from './views/About';
import GDPR from './components/GDPR';
import Title from './components/Title';
import Admin from './views/Admin';
import FeedbackForm from './components/FeedbackForm';
import Settings from './views/Settings';
import ErrorPage from './views/ErrorPage';
import { setLocale } from './util/localization/i18n';
import smoothscroll from 'smoothscroll-polyfill';

import './public/css/views.scss';
import './public/css/main.scss';
import './public/css/components.scss';
import './public/css/admin.scss';
import './public/css/about.scss';
import './public/css/settings.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    smoothscroll.polyfill();

    const view = window.location.pathname.split('/').pop();
    if (!view) window.location.pathname = '/main';

    this.state = {
      error: null,
      loading: false,
      lang: document.documentElement.lang || 'en',
      view,
      logged: !!window.localStorage.getItem('token'),
      items: []
    };

    this.chart = React.createRef();

    window.onpopstate = () => {
      this.setState({ view: window.location.pathname.split('/').pop(), items: [] });
    };
  }

  setApiResults = (res) => {
    const scrollToChart = () => { setTimeout(() => {
      document.getElementById('chartanchor').scrollIntoView({behavior:'smooth'})}, 200)}
    //const scrollToCb = () => { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); };
    this.setState(() => ({ ...res, loading: false }), scrollToChart);
  }

  updateNavi = () => {
    this.setState(prevState => ({ logged: !prevState.logged }));
  }

  setView = (view) => {
    this.setState((prevState) => {
      // eslint-disable-next-line
      history.pushState({}, '', window.location.href.replace(prevState.view, view));
      return { ...prevState, view };
    });
  }

  setLang = (lang) => {
    document.documentElement.lang = lang;
    setLocale(lang);
    this.setState({ lang });
  }

  submitForm = (data) => {
    const submitData = {
      diagnosis: data.diagnosis.value,
      status: data.rfield.value,
      stimulations: data.formGroups.map(node => ({
        ...Object.assign(...node.fields.map(field => ({ [field.name]: field.value }))),
        stimulation: node.stimulation + 1
      }))
    };
    Api(submitData, this.setApiResults);
  }

  render() {
    if (this.state.error) return <ErrorPage />;
    return (
      <>
        <div className="app" style={{ minHeight: '100vh' }}>
          <Navibar setView={this.setView} logged={this.state.logged} setLang={this.setLang} updateNavi={this.updateNavi} />
          { this.state.view === 'about' && <About /> }
          { this.state.view === 'login' && <Login setView={this.setView} updateNavi={this.updateNavi} /> }
          { this.state.view === 'settings' && <Settings setView={this.setView} updateNavi={this.updateNavi} /> }
          { this.state.view === 'admin' && <Admin setView={this.setView} /> }
          { this.state.view === 'main' && [<Title key="title" setView={this.setView} />, <Form key={this.state.lang} onSubmit={this.submitForm} />] }
          { !this.state.loading && this.state.items.length > 0 && this.state.view === 'main'
            && (
            <>
              <Chart data={this.state.items} ref={this.chart} className="ivfChart" />
              <FeedbackForm />
            </>
            )
          }
        </div>
        <GDPR />
      </>
    );
  }
}


ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>, document.getElementById('app')
);
