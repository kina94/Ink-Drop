export const isEndOfPage = (response) => {
  if (
    response.data.meta.is_end &&
    response.data.meta.pageable_count !== 0 &&
    document.querySelector(".content").scrollTop !== 0
  ) {
    return true;
  }
};