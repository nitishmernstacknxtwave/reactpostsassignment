import {Component} from 'react'

import './index.css'

class ShowComments extends Component {
  deleteComments = async () => {
    const {id, deleteComment} = this.props
    const apiUrl = `https://jsonplaceholder.typicode.com/comments/${id}`
    const options = {
      method: 'DELETE',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      console.log(id)
      deleteComment(id)
    }
  }

  render() {
    const {comment} = this.props
    const {name, email, body} = comment
    return (
      <>
        <li>
          <p>{name}</p>
          <p>{email}</p>
          <p>{body}</p>
        </li>

        <button type="button" onClick={this.deleteComments} className="delete">
          delete
        </button>
      </>
    )
  }
}

export default ShowComments
