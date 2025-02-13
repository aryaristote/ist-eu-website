import NewsBody from '@/app/sections/rw/NewsBody'
import NewsHeader from '@/app/sections/rw/NewsHeader'
import Podcast from '@/app/sections/rw/Podcast'
import React from 'react'

export const metadata = {
  title: 'News - IST Legal',
  description: 'Latest news and updates from IST Legal. Stay informed about legal developments, company announcements, and industry insights.',
  keywords: 'legal news, IST Legal news, legal updates, legal industry news',
};

const page = () => {
  return (
    <div className="pt-32 md:pt-20 pb-20">
        <Podcast />
        <NewsHeader />
        <NewsBody />
    </div>
  )
}

export default page
