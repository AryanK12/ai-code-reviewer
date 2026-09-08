import { useState } from 'react'
import EditorModule from 'react-simple-code-editor'
import prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'
import axios from 'axios'
import './App.css'

const Editor = EditorModule.default

function App() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`)
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function reviewCode() {
    setLoading(true)
    setError(null)
    setReview(null)

    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code-editor">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) => prism.highlight(code, prism.languages.javascript, 'javascript')}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              minHeight: '100%'
            }}
          />
        </div>
        <button
          onClick={reviewCode}
          disabled={loading}
          className="review-btn"
        >
          {loading ? 'Reviewing...' : 'Review'}
        </button>
      </div>

      <div className="right">
        {error && <div className="error-box">{error}</div>}

        {review && (
          <div className="review-output">
            <p className="summary">{review.summary}</p>

            {review.issues?.length > 0 && (
              <>
                <h3>Issues</h3>
                {review.issues.map((issue, i) => (
                  <div key={i} className={`issue-card severity-${issue.severity}`}>
                    <span className="category">{issue.category}</span>
                    <p>{issue.description}</p>
                  </div>
                ))}
              </>
            )}

            {review.suggestions?.length > 0 && (
              <>
                <h3>Suggestions</h3>
                {review.suggestions.map((s, i) => (
                  <div key={i} className="suggestion-card">
                    <strong>{s.title}</strong>
                    <p>{s.explanation}</p>
                    {s.code && <pre><code>{s.code}</code></pre>}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {!review && !error && !loading && (
          <p className="placeholder">Your code review will appear here.</p>
        )}
      </div>
    </main>
  )
}

export default App