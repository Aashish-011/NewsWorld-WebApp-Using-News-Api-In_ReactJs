import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  state={
      progress: 0
  }
    setProgress = (progress) => {
      this.setState({progress: progress})
    }
  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <LoadingBar
          height={4}
        color='#ED9114'
        progress={this.state.progress}
      />
          <Routes>
            <Route exact path="/" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="general"   country="in" category="General"/>}/>
            <Route exact path="/business" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="business"   country="in" category="Business"/>}/>
            <Route exact path="/entertainment" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment"   country="in" category="Entertainment"/>}/>
            <Route exact path="/health" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="health" country="in" category="Health"/>}/>
            <Route exact path="/science" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="science" country="in" category="Science"/>}/>
            <Route exact path="/sports" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" country="in" category="Sports"/>}/>
            <Route exact path="/technology" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="technology"   country="in" category="Technology"/>}/>
          </Routes>
        </div>
      </Router>
    );
  }
}
