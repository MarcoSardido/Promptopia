"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = ({ params }) => {
    const searchParam = useSearchParams()
    const userName = searchParam.get('name')

    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`)
            const data = await response.json()
            setUserPosts(data)
        }
        if (params?.id) fetchPost()
    }, [params?.id])
    
    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            data={userPosts}
        />
    )
}

export default MyProfile