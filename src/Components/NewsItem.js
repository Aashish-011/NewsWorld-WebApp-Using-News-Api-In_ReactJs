import React, { Component } from 'react'
import defaultImg from './defaultImg.jpg'

export class NewsItem extends Component {


  render() {
    let {title,description,imgUrl,newsUrl,dateandtime} = this.props;
    return (
      <>
      <div className="card my-3">
      <img src={imgUrl?imgUrl:defaultImg} className="card-img-top" style={{height:'35vh'}} alt="Not Available"/>
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p className="card-text"><small className="text-muted">Published At: {new Date(dateandtime).toGMTString()}</small></p>
        <a href={newsUrl} target='_blank' className="btn btn-sm btn-danger">Read More</a>
      </div>
    </div>
    </>
    ) 
  }
}

export default NewsItem
 