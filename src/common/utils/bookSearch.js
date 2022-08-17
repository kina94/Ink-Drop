import { useEffect } from "react";

export const isEndOfPage = (response) => {
  if (
    response.data.meta.is_end &&
    response.data.meta.pageable_count !== 0 &&
    document.querySelector(".content").scrollTop !== 0
  ) {
    return true;
  }
};

export const useInfiniteScrollEffect = (listner) => {
  const onScroll = () => {
    const scrollHeight = document.querySelector(".content").scrollHeight;
    const scrollTop = document.querySelector(".content").scrollTop; 
    const clientHeight = document.querySelector(".content").clientHeight; 
    document.querySelector('.book-list') && localStorage.setItem('scroll', scrollTop)
    listner(scrollHeight, scrollTop, clientHeight);
  };
  
  useEffect(() => {
    document.querySelector(".content").addEventListener("scroll", onScroll);
    return () => {
      document.querySelector(".content") &&
        document
          .querySelector(".content")
          .removeEventListener("scroll", onScroll);
    };
  });
};
