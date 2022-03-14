import { useState } from 'react';
import { jobMap } from '../data/jobMap';

export default function Home() {
  const [state, setState] = useState('');
  return (
    <main style={{ padding: '20px', fontFamily: '' }}>
      <label>
        Filter by text<br/>
        <input value={state} onChange={e => setState(e.target.value)} placeholder="e.g Urology" />
      </label>
      {Object.entries(jobMap).filter(([_, { content }]) => content.includes(state)).map(([group, { location, content }]) => {
        if (location && content) {
          return (
            <article>
              <h2>{group}</h2>
              <h3>{location}</h3>
              <p>{content.split('F2')[0]}</p>
              <p>F2{content.split('F2')[1]}</p>
            </article>
          )
        }

        return <><h1>{group}</h1></>

      })}
      <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            color: #222222;
          }

          article {
            border: solid 1px #222222;
            border-radius: 3px;
            padding: 15px 25px;
            margin-bottom: 30px;
          }

          h2 {
            line-height: 0;
          }

          h3 {
            font-weight: 600;
          }

          label {
            font-weight: 600;
          }

          input {
            font-size: 16px;
            margin-bottom: 20px;
          }
          
        `}
      </style>
    </main>
  )
}
