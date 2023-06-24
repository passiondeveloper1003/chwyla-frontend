import React from 'react'
import ArticleCard from './cards/article'
import useBlogQuery from '../hooks/use-blog-query'

const BlogArchive = () => {

  const posts = useBlogQuery()

  return (
    <section className='blog-archive'>
      { posts?.length > 0 &&
        <div className='blog-archive__inner'>
          <div className='blog-archive__items'>
            { posts?.map((el, i) => <ArticleCard key={i} {...el} />) }
          </div>
        </div>
      }
    </section>
  )
}

export default BlogArchive