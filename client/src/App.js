import './App.css';

//components
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Posts from './components/posts/Posts'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Posts />
    </div>
  );
}

export default App;
