const NAME = 'css-tricks',
      DOMAIN = `https://${NAME}.com`,
      SITE = `${DOMAIN}/wp-json`,
      API_WP = `${SITE}/WP/v2`,
      PER_PAGE = 9,
      POSTS = `${API_WP}/posts?_embed&per_page=${PER_PAGE}`,
      POST = `${API_WP}/posts`,
      SEARCH = `${API_WP}/search?_embed&per_page=${PER_PAGE}&search=`;

let page = 1;

export default{
   NAME,
   DOMAIN,
   SITE,
   API_WP,
   POST,
   PER_PAGE,
   POSTS,
   SEARCH,
   page
}