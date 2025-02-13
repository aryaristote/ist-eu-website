import React from "react"
import NewsHeader from "../../sections/en/NewsHeader"
import Body from "../../sections/en/NewsBody"
import Podcast from "../../sections/en/Podcast"

export const metadata = {
  title: 'News - IST Legal',
  description: 'Latest news and updates from IST Legal. Stay informed about legal developments, company announcements, and industry insights.',
  keywords: 'legal news, IST Legal news, legal updates, legal industry news',
};

const News = () => {
  return (
    <div className="pt-32 md:pt-20 pb-20">
      <Podcast />
      <NewsHeader />
      <Body />
    </div>
  )
}

export default News