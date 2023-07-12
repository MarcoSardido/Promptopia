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
  const [posts, setPosts] = useState([])

  const [searchedText, setSearchedText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }

    fetchPost()
  }, [])

  const filterSearch = (searchText) => {
    const exp = new RegExp(searchText, 'i')
    return posts.filter(post => exp.test(post.creator.username) || exp.test(post.tag))
  }

  const handleSearch = (e) => {
    clearTimeout(searchTimeout)
    setSearchedText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const result = filterSearch(e.target.value)
        setSearchResult(result)
      }, 500)
    )
  }

  const handleTagSearchClick = (tagName) => {
    setSearchedText(tagName)

    const result = filterSearch(tagName)
    setSearchResult(result)

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
      {searchResult ? (
        <PromptCardList
          data={searchResult}
          handleTagClick={handleTagSearchClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagSearchClick} />
      )}
    </section>
  )
}

export default Feed