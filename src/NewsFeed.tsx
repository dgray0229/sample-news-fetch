import { useEffect, useState } from 'react';
import {
  useQuery,
} from 'react-query'

type NewsItem = {
  headline: string;
  date: string;
  readers: string;
};
export default function NewsFeed () {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [showAll, setShowAll] = useState(false);

  function toggleShowAll () {
    setShowAll(prev => !prev);
  }

  async function fetchNews () {
    const response = await fetch(`/news.json`);
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  const { isLoading, isError, error, data } = useQuery({ queryKey: ['newsData'], queryFn: fetchNews })

  useEffect(() => {
    if (showAll) {
      setNewsData(data.data);
    } else {
      setNewsData(data.data.slice(0, 5));
    }
  }, [showAll]);

  if (isLoading) {
    return <span>Fetching data...</span>
  }

  if (isError) {
    return <span>Error: {error instanceof Error && error.message}</span>
  }

  return (
    <>
      <ul className={`newsfeed ${showAll ? 'show' : ''}`}>
        {newsData.map((newsItem: NewsItem) => {
          return (
            <li>
              <p><strong>{newsItem.headline}</strong></p>
              <span>{newsItem.date} {newsItem.readers}</span>
            </li>
          );
        })}
      </ul>
      <button onClick={toggleShowAll}>Show {showAll ? 'Less' : 'More'}</button>
    </>
  );
}
