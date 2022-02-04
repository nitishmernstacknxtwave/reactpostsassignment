import {Component} from 'react'
import Comments from '../Comments'
import './index.css'

class Posts extends Component {
  state = {
    show: false,
    postTitle: '',
    postBody: '',
    update: false,
  }

  showComments = () => {
    this.setState(prevState => ({show: !prevState.show}))
  }

  updatePost = () => {
    const {posts} = this.props
    const {title, body} = posts

    this.setState({update: true, postTitle: title, postBody: body})
  }

  onChangeTitle = event => {
    this.setState({postTitle: event.target.value})
  }

  onChangeBody = event => {
    this.setState({postBody: event.target.value})
  }

  submitUpdate = async event => {
    event.preventDefault()
    const {posts, updatePosts} = this.props

    const {id, userId} = posts
    const {postTitle, postBody} = this.state

    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${id}`
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        id,
        title: postTitle,
        body: postBody,
        userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      updatePosts(fetchedData)
      this.setState({update: false})
    }
  }

  deletePost = async () => {
    const {posts, deletePosts} = this.props

    const {id} = posts
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${id}`
    const options = {
      method: 'DELETE',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      deletePosts(id)
    }
  }

  renderUpdate = () => {
    const {postTitle, postBody} = this.state

    return (
      <>
        <form className="form-container" onSubmit={this.submitUpdate}>
          <input
            type="text"
            id="title"
            value={postTitle}
            onChange={this.onChangeTitle}
          />
          <textarea
            id="body"
            rows="10"
            cols="20"
            value={postBody}
            onChange={this.onChangeBody}
          />
          <button type="submit"> Submit </button>
        </form>
      </>
    )
  }

  render() {
    const {show, update} = this.state

    const {posts} = this.props
    const {title, body, id} = posts

    return (
      <>
        <li>
          <h1>{title}</h1>
          <p>{body}</p>
          {update ? (
            this.renderUpdate()
          ) : (
            <div>
              <button
                onClick={this.updatePost}
                className="update"
                type="button"
              >
                Update Post
              </button>

              <button
                onClick={this.deletePost}
                className="delete"
                type="button"
              >
                Delete Post
              </button>
            </div>
          )}
        </li>
        {show ? (
          <button className="close" onClick={this.showComments} type="button">
            Close
          </button>
        ) : (
          <button className="show" onClick={this.showComments} type="button">
            View comments
          </button>
        )}
        {show && <Comments id={id} />}
      </>
    )
  }
}

export default Posts
