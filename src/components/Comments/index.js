import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ShowComments from '../ShowComments'

import './index.css'

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
    create: false,
    commentName: '',
    commentEmail: '',
    commentBody: '',
  }

  componentDidMount() {
    this.getComments()
  }

  getComments = async () => {
    const {id} = this.props
    const apiUrl = `https://jsonplaceholder.typicode.com/comments/?postId=${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({isLoading: false, comments: fetchedData})
    }
  }

  createComment = () => {
    this.setState({create: true})
  }

  deleteComment = id => {
    const {comments} = this.state

    if (comments !== undefined) {
      const index = comments.findIndex(each => each.id === id)
      comments.splice(index, 1)
      this.setState(comments)
    }
  }

  onChangeName = event => {
    this.setState({commentName: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({commentEmail: event.target.value})
  }

  onChangeBody = event => {
    this.setState({commentBody: event.target.value})
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  createComments = data => {
    this.setState(prevState => ({comments: [...prevState.comments, data]}))
  }

  submitCreate = async event => {
    event.preventDefault()
    const {id} = this.props

    const {commentName, commentEmail, commentBody} = this.state

    const apiUrl = `https://jsonplaceholder.typicode.com/comments`
    const options = {
      method: 'POST',
      body: JSON.stringify({
        postId: id,
        name: commentName,
        email: commentEmail,
        body: commentBody,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      if (commentName !== '' && commentEmail !== '' && commentBody !== '') {
        this.createComments(fetchedData)
        this.setState({create: false})
      }
    }
  }

  renderUpdate = () => {
    const {commentName, commentEmail, commentBody} = this.state

    return (
      <>
        <form className="forms-container" onSubmit={this.submitCreate}>
          <input
            type="text"
            id="name"
            value={commentName}
            onChange={this.onChangeName}
            placeholder="name"
          />
          <input
            type="text"
            id="email"
            value={commentEmail}
            onChange={this.onChangeEmail}
            placeholder="email"
          />

          <textarea
            id="body"
            rows="10"
            cols="20"
            value={commentBody}
            onChange={this.onChangeBody}
            placeholder="body"
          />
          <button type="submit"> Submit </button>
        </form>
      </>
    )
  }

  render() {
    const {isLoading, comments, create} = this.state
    return (
      <>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div>
            {create ? (
              this.renderUpdate()
            ) : (
              <button
                type="button"
                className="create"
                onClick={this.createComment}
              >
                Create Comment
              </button>
            )}

            <ul>
              {comments.map(comment => (
                <ShowComments
                  deleteComment={this.deleteComment}
                  comment={comment}
                  key={comment.id}
                  id={comment.id}
                />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default Comments
