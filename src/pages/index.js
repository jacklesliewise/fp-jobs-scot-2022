import { useState } from 'react';
import { jobMap } from '../data/jobMap';

function debounce(func, wait) {
  let timeout;

  return function() {
    const context = this;
    const args = arguments;

    clearTimeout(timeout);

    timeout = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  }
}

export default function Home() {
  const [state, setState] = useState('');

  const debouncedSetState = debounce((value) => setState(value), 500);

  const filterByState = (content, location) => {
    return content.toLowerCase().includes(state.toLowerCase()) || location.toLowerCase().includes(state.toLowerCase())
  }

  return (
    <>
      <header style={{ padding: '10px 20px' }}>
        <h1>Scotland Foundation Programmes 2022</h1>  
        <input aria-label='Filter by text' type="search" onChange={e => {
          const { value } = e.target;

          if (value.length > 0) {
            debouncedSetState(value)
          } else {
            setState(value);
          }
        }} placeholder="Search by job content or location..." />
      </header>
      <main style={{ padding: '0px 20px', fontFamily: '' }}>
        {Object.entries(jobMap).map(([area, group]) => {
          const groups = Object.entries(group).filter(([_, { content, location }]) => filterByState(content, location)).map(([group, { location, content }]) => (
            <li style={{ marginTop: '50px' }} key={group}>
              <h2>{group}</h2>
              <h3>{location}</h3>
              <p>{content.split('F2')[0]}</p>
              <p>F2{content.split('F2')[1]}</p>
            </li>
          ));
          
          if (groups.length > 0) {
            return (
              <details key={area} open>
                <summary>{area}</summary>
                <ul>
                  {groups}
                </ul>
              </details>
            )
          }

          return null;
        })}
      </main>
      <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            color: #222222;
          }

          summary {
            font-size: 2em;
            font-weight: bold;
          }

          ul {
            list-style-type: none;
            padding: 0;
          }

          details {
            border: solid 1px #222222;
            border-radius: 3px;
            padding: 15px 25px;
            margin-bottom: 30px;
          }

          h2 {
            font-weight: 600;
            line-height: 0;
          }

          h3 {
            font-weight: 400;
          }

          p {
            font-weight: 300;
          }

          input {
            padding: 10px;
            border: solid 1px #222222;
            border-radius: 3px;
            width: 100%;
            max-width: 400px;
            font-size: 20px;
            margin-bottom: 20px;
            box-shadow: none;
          }
          
        `}
      </style>
    </>
  )
}
