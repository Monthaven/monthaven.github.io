// permalink must be a real boolean false to suppress output. Returning the string
// "false" from YAML front matter writes a file literally named "false" instead.
export default {
  permalink: (data) => (data.env && data.env.staging ? false : "/sitemap.xml"),
};
