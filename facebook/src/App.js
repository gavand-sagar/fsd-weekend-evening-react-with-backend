import logo from './logo.svg';
import { useEffect, useState } from 'react'
import './App.css';

function App() {

  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {

    fetch('http://localhost:3001/posts')
      .then(res => res.json())
      .then(response => {

        //all posts
        setPosts(response)

      })

  }, [])


  const SendPost = () => {
    const post = {
      content: content,
      author: author
    }

    fetch('http://localhost:3001/posts', {
      body: JSON.stringify(post) ,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(res => res.json())
      .then(response => {

        //all posts
        setPosts(response)

      })

  }

  return (
    <>
      <input type="text" value={content} onChange={e => setContent(e.target.value)} placeholder='content' /><br />
      <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder='author' /><br />
      <button onClick={SendPost}>Send</button>

      <hr />

      <h1>All posts</h1>

      {posts.map(x => <p><b>{x.content}</b> by {x.author}</p>)}

    </>
  );
}

export default App;
