import "./App.css";
import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress,setProgress] = useState(0)

    return (
      <Router>
        <div>
          <Navbar/>
          <LoadingBar
          height={4}
        color='#ED9114'
        progress={progress}
      />
          <Routes>
            <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="general"   country="in" category="General"/>}/>
            <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business"   country="in" category="Business"/>}/>
            <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment"   country="in" category="Entertainment"/>}/>
            <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" country="in" category="Health"/>}/>
            <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" country="in" category="Science"/>}/>
            <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" country="in" category="Sports"/>}/>
            <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology"   country="in" category="Technology"/>}/>
          </Routes>
        </div>
      </Router>
    );
}
export default App
