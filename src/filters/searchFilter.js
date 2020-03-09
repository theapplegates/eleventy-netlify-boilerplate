const elasticlunr = require("elasticlunr");

module.exports = function(collection) {
  // what fields we'd like our index to consist of
  var index = elasticlunr(function() {
    this.addField("title");
    this.addField("summary");
    this.addField("tags");
    this.addField("id");
  });

  // loop through each page and add it to the index
  collection.forEach(page => {
    index.addDoc({
      id: page.url,
      title: page.template.frontMatter.data.title,
      excerpt: page.template.frontMatter.data.summary,
      genres: page.template.frontMatter.data.tags,
    });
  });

  return index.toJSON();
};