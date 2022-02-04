import {Link} from 'react-router-dom'

import './index.css'

const User = props => {
  const {userData} = props
  const {imgUrl, name, userId} = userData

  return (
    <Link to={`/posts/${userId}`} className="link-item">
      <li className="user-item">
        <img src={imgUrl} alt="name" className="image" />
        <p className="user-name">{name}</p>
      </li>
    </Link>
  )
}

export default User
