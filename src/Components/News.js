import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Load from "./Load";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
 static defaultProps ={
  country : 'in',
  category: 'general'
 }

 static propTypes ={
  country: PropTypes.string,
  category: PropTypes.string
 }
  constructor(props) {
    super(props);
    this.state ={
      articles: [],
      page : 1,
      loading : false,
      totalResults : 0
    }
      document.title = this.props.category  + "  News | News World";
  }


 async componentDidMount(){
   this.setState({loading: true});
   this.props.setProgress(25);
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}`;
   this.props.setProgress(50);
   let data = await fetch(url);
   let parsedData = await data.json();
   this.props.setProgress(75);
   this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false});
   this.props.setProgress(100);
  }

  fetchMoreData =  async() => {
      this.setState({page: this.state.page +1});
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults});
  };

  render() {
    return (
      <>
        <h3 className="mx-3 my-2 text-center"><span style={{fontSize:'40px',color:'blueviolet'}}>News World</span> - News From {this.props.category} World </h3>
        {this.state.loading && <Load/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Load/>}
        >
        <div className="row mx-3">
        { this.state.articles.map((element)=>{
          return <div className="col-md-3 "  key={element.url}>
            <NewsItem
              dateandtime={element.publishedAt}
              title={element.title?element.title.slice(0, 40):" "}
               description={element.description?element.description.slice(0, 80):" "}
              imgUrl={element.urlToImage}
              newsUrl={element.url}/>
          </div>
          })}
          </div>
          </InfiniteScroll>  
              </>
    )
  }
}

export default News;
