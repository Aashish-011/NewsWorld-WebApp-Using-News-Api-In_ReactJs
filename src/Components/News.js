import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Load from "./Load";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
 const [articles,setArticles] = useState([])
 const [loading,setLoading] = useState(false)
 const [page,setPage] = useState(1)
 const [totalResults,setTotalResult] = useState(0)
 
 useEffect (()=>{
    document.title = props.category  + "  News | News World";
   updateNews()
  },[])
  
  
 const updateNews = async ()=>{
  setLoading(true);
   props.setProgress(25);
   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}`;
   props.setProgress(50);
   let data = await fetch(url);
   let parsedData = await data.json();
   props.setProgress(75);
   setArticles(parsedData.articles)
   setTotalResult(parsedData.totalResult)
   setLoading(false)
   props.setProgress(100);
  }
  
  const fetchMoreData =  async() => {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}`;
      setPage(page+1)
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResult(parsedData.totalResults)
  };

  
    return (
      <>
        <h3 className="text-center mt-5"><span style={{fontSize:'40px',color:'#A94919'}}>News World</span> - News From {props.category} World </h3>
        {loading && <Load/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Load/>}
        >
        <div className="row mx-3">
        { articles.map((element)=>{
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

News.defaultProps ={
  country : 'in',
  category: 'general'
 }

News.propTypes ={
  country: PropTypes.string,
  category: PropTypes.string
 }

export default News;
