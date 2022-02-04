import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Posts from '../PostsDetails'

import './index.css'

class UserPosts extends Component {
  state = {
    userPosts: [],
    isLoading: false,
    create: false,
    postTitle: '',
    postBody: '',
  }

  componentDidMount() {
    this.getUserPosts()
  }

  getUserPosts = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/?userId=${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({isLoading: false, userPosts: fetchedData})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getUpdatedPosts = data => {
    const {userPosts} = this.state
    if (userPosts !== undefined) {
      const index = userPosts.findIndex(each => each.id === data.id)
      userPosts.splice(index, 1, data)
      this.setState(userPosts)
    }
  }

  createPost = () => {
    this.setState({create: true})
  }

  onChangeTitle = event => {
    this.setState({postTitle: event.target.value})
  }

  onChangeBody = event => {
    this.setState({postBody: event.target.value})
  }

  deletePosts = id => {
    const {userPosts} = this.state

    if (userPosts !== undefined) {
      const index = userPosts.findIndex(each => each.id === id)
      userPosts.splice(index, 1)
      this.setState(userPosts)
    }
  }

  submitUpdate = async event => {
    event.preventDefault()
    const {match} = this.props
    const {params} = match
    const {id} = params
    const userId = id
    const {postTitle, postBody} = this.state

    const apiUrl = `https://jsonplaceholder.typicode.com/posts/`
    const options = {
      method: 'POST',
      body: JSON.stringify({
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
      if (postTitle !== '' && postBody !== '') {
        this.setState(prevState => ({
          userPosts: [...prevState.userPosts, fetchedData],
        }))
        this.setState({create: false})
      }
    }
  }

  render() {
    const {isLoading, userPosts, create, postTitle, postBody} = this.state

    return (
      <>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className="posts-container">
            {create ? (
              <form className="forms-container" onSubmit={this.submitUpdate}>
                <input
                  type="text"
                  id="title"
                  value={postTitle}
                  onChange={this.onChangeTitle}
                  placeholder="title"
                />
                <textarea
                  id="body"
                  rows="10"
                  cols="20"
                  value={postBody}
                  onChange={this.onChangeBody}
                  placeholder="body"
                />
                <button type="submit"> Submit </button>
              </form>
            ) : (
              <button
                onClick={this.createPost}
                type="button"
                className="create"
              >
                Create Post
              </button>
            )}
            <ul>
              {userPosts.map(posts => (
                <Posts
                  posts={posts}
                  userId={posts.userId}
                  key={posts.id}
                  id={posts.id}
                  updatePosts={this.getUpdatedPosts}
                  deletePosts={this.deletePosts}
                />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default UserPosts
