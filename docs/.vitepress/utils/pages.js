import fs from 'mz/fs';
import matter from 'gray-matter';

function rTime(date) {
  if(date){
    const json_date = new Date(date).toJSON();
    const result = json_date.split("T")[0]
    return result;
  }else{
    return new Date().toJSON().split('T')[0]
  }
}

var compareDate = function (obj1, obj2) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
};

module.exports = async () => {
  const globby = await import('globby');
  const paths = await globby.globby(["**.md"], {
    ignore: ["node_modules", "README.md"],
  });
  let pages = await Promise.all(
    paths.map(async (item) => {
      const content = await fs.readFile(item, "utf-8");
      const { data } = matter(content);
      data.date = rTime(data.date);
      return {
        frontMatter: data,
        regularPath: `/${item.replace(".md", ".html")}`,
        relativePath: item,
      };
    })
  );
  pages = pages.filter((item) => !item.frontMatter.page);
  pages.sort(compareDate);
  return pages;
};
