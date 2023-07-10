'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <PromptCard key={post._id}
          post={post}
          handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchedText, setSearchedText] = useState()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }

    fetchPost()
  }, [])

  const handleSearch = (e) => {

  }
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text" className='search_input peer'
          placeholder="Search tag or a username"
          value={searchedText}
          onChange={handleSearch}
          required />
      </form>
      <PromptCardList data={posts} handleTagClick={() => { }} />
    </section>
  )
}

export default Feed