import { jobMap } from '../data/jobMap';

export default function Home() {
  return (
    <main style={{ padding: '20px' }}>
      {Object.entries(jobMap).map(([group, { location, content }]) => {
        if (location && content) {
          return (
            <>
              <h2>{group}</h2>
              <h3>{location}</h3>
              <p>{content.split('F2')[0]}</p>
              <p>F2{content.split('F2')[1]}</p>
            </>
          )
        }

        return <><h1>{group}</h1></>

      })}
    </main>
  )
}
