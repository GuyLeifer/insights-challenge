import './App.css';

//components
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import GenericNotFound from './components/genericNotFound/GenericNotFound';

import Posts from './components/posts/Posts';
import PostId from './components/posts/components/PostId';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Header />
        <Switch>
          <Route exact path="/posts" component={Posts} />
          <Route path="/posts/:id" component={PostId} />
          <Route path="/about" component={About} />
          <Route path='*' exact={true} status={404} component={GenericNotFound}/>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
