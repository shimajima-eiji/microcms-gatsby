import React from "react"
import { Link } from "gatsby"

export default function Post ( { pageContext } )
{
  const { title, body } = pageContext.post;
  return (
    <>
      <h1>{ title }</h1>
      <div dangerouslySetInnerHTML={ { __html: body } } />
      <Link to="/blogList">トップに戻る</Link>
    </>
  )
}
