import React, { Suspense } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
const NewsFeed = React.lazy(() => import("./NewsFeed"));
import './App.css'
import './custom.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})

function App () {
  const title = "LinkedIn News";

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <h1>{title}</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <NewsFeed />
          </Suspense>
        </div>
      </QueryClientProvider>
    </>
  )
}

export default App
