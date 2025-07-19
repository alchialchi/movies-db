import { useEffect, useRef } from 'react';

export default function useInfiniteScroll({
  isLoading = false,
  hasMore = false,
  onLoadMore,
  threshold = 200
}) {
  const loadingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight } = document.documentElement;
      const { innerHeight } = window;

      if (
        scrollTop + innerHeight >= scrollHeight - threshold &&
        !isLoading &&
        hasMore &&
        !loadingRef.current
      ) {
        loadingRef.current = true;
        onLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, onLoadMore, threshold]);

  useEffect(() => {
    if (!isLoading) {
      loadingRef.current = false;
    }
  }, [isLoading]);
}
