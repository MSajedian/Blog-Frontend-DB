import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import "./styles.css";
import uniqid from "uniqid";

class Blog extends Component {
  state = {
    posts: [],
    comments: [],
    blog: {},
    loading: true,
  };

  componentDidMount = async () => {
    // const apiUrl = process.env.REACT_APP_BACKEND_API_URL
    const BackendAPIURL = "http://localhost:3001"
    const blogpostsResp = await fetch(`${BackendAPIURL}/blogposts`)
    // ,{
    //   headers:{
    //     Origin: process.env.REACT_APP_FRONTEND_API_URL
    //   }
    // }
    // console.log(blogpostsResp)
    const blogposts = await blogpostsResp.json()
    this.setState({ posts: blogposts })


    const { id } = this.props.match.params;
    console.log(this.state.posts);
    const blog = this.state.posts.find((post) => post._id.toString() === id);
    if (blog) {
      this.setState({ blog, loading: false });
      // this.setState({ comments:blog.comments, loading: false });
    } else {
      this.props.history.push("/404");
    }

    // const commentsResp = await fetch(`${BackendAPIURL}/blogposts`)
    // const blogpostsComments = await commentsResp.json()
    // this.setState({ comments: blogpostsComments })
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
            <hr />
            <h2>Comments:</h2>
            <div>
              {blog.comments.map((comment) => (
                <div md={4} style={{ marginBottom: 50 }} key={uniqid()}>
                  <p>{comment.comment}</p>
                  <p><strong>Rate:</strong> {comment.rate}</p>
                </div>
              ))}
            </div>            
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
