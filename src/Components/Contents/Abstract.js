import React, {useState, useEffect} from 'react'
import MarkdownRender from './Markdown.js'
import Latex from 'react-latex'
import file   from './example.md'
let out = null
const LaTeX = `  daughter-in-law, X-rated\\
    pages 13--67\\
    yes---or no? \\
    $0$, $1$ and $-1$`
const Abstract = () => {
const [text, setText] = useState(null)
useEffect(() => {
  fetch(file)
    .then((res) => {
      res.text()
        .then(text => setText(text))
      })
})
return (
<Latex>{LaTeX}</Latex>
)
}

export default Abstract
