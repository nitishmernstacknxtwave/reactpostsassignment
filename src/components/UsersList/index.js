import {Component} from 'react'
import User from '../User'

import './index.css'

const userList = [
  {
    name: 'Naruto Uzumaki',
    userId: 1,
    imgUrl: 'http://clapway.com/wp-content/uploads/2016/03/10.-Naruto.jpg',
  },
  {
    name: 'Sasuke Uchiha',
    userId: 2,
    imgUrl:
      'http://pm1.narvii.com/5652/f25b8ae75660b6dcea16b3bbc999891a8ff0c36a_hq.jpg',
  },
  {
    name: 'Sakura Haruno',
    userId: 3,
    imgUrl:
      'https://3.bp.blogspot.com/-TamzwwYYyjA/Uzv42fPTfAI/AAAAAAAABaI/MTEhjrJCVx8/s1600/HARUNO_SAKURA_RENDER_0006.png',
  },
  {
    name: 'Hinata Hyuga',
    userId: 4,
    imgUrl:
      'http://images5.fanpop.com/image/user_images/4043000/Zekrom676-4043800_500_375.jpg',
  },
  {
    name: 'Kakashi Hatake',
    userId: 5,
    imgUrl: 'https://wallpapercave.com/wp/wp3026476.png',
  },
  {
    name: 'Itachi Uchiha',
    userId: 6,
    imgUrl:
      'https://tse2.mm.bing.net/th?id=OIP.jY0cPLdlRHufez1yVO0uCwHaEK&pid=Api&P=0&w=295&h=166',
  },
  {
    name: 'Rock Lee',
    userId: 7,
    imgUrl:
      'https://tse2.mm.bing.net/th?id=OIP.zxt3_gQb9nJzIEfWTdetXgHaEK&pid=Api&P=0&w=330&h=186',
  },
  {
    name: 'Minato Uzumaki',
    userId: 8,
    imgUrl:
      'https://imgix.ranker.com/user_node_img/50088/1001756899/original/a-father-job-photo-u2?fit=crop&fm=pjpg&q=60&w=375&dpr=1',
  },
  {
    name: 'Hashirama Senju',
    userId: 9,
    imgUrl:
      'https://tse1.mm.bing.net/th?id=OIP.kED_MK_8Ra_CQlY-YqCAxAHaFj&pid=Api&P=0&w=247&h=185',
  },
  {
    name: 'Jiraiya Ogato',
    userId: 10,
    imgUrl:
      'https://tse3.mm.bing.net/th?id=OIP.VuOqozrBCLXgxoINtFXqHgHaH_&pid=Api&P=0&w=166&h=180',
  },
]

class UsersList extends Component {
  render() {
    return (
      <>
        <ul className="users-container">
          {userList.map(user => (
            <User userData={user} key={user.userId} />
          ))}
        </ul>
      </>
    )
  }
}

export default UsersList
