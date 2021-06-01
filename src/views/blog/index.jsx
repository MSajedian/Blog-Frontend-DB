import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
// import posts from "../../data/posts.json";
import "./styles.css";
class Blog extends Component {
  state = {
    posts: [],
    blog: {},
    loading: true,
  };

    componentDidMount = async () => {
    // const apiUrl = process.env.REACT_APP_BACKEND_API_URL
    const BackendAPIURL="http://localhost:3001"
    const resp = await fetch(`${BackendAPIURL}/blogposts`
    // ,{
    //   headers:{
    //     Origin: process.env.REACT_APP_FRONTEND_API_URL
    //   }
    // }
    )
    console.log(resp)
    const blogposts = await resp.json()
    this.setState({ posts: blogposts })

    const { id } = this.props.match.params;
    console.log(this.state.posts);
    const blog = this.state.posts.find((post) => post._id.toString() === id);
    if (blog) {
      this.setState({ blog, loading: false });
    } else {
      this.props.history.push("/404");
    }
  }

  render() {
    const { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
