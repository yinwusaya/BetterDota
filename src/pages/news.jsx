import React from 'react';
import styles from './news.less';
import {Layout} from 'antd'
import News from "@/components/news/news.tsx"

const {Header, Content, Footer, Sider} = Layout

class NewsList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoaded: false,
      error: null,
      newsList: []
    }
  }
  componentDidMount(){
    fetch("/api/news")
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        this.setState({
          isLoaded: true,
          newsList: result
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
    )
  }
  render(){
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      window.i = this.state.newsList
      return (
        this.state.newsList.map((elem, index) => <News news={elem} key={elem.id} />)
      )
    }
  }
}

export default () => {
  return (
    <NewsList />
  );
}
