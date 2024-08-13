import BlogList from "@/modules/blog/components/BlogList";
import { FC } from "react";
import Icon from "supercons";

const BlogPreview: FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Latest Article</h2>
        <div className="flex  gap-1 hover:gap-3 transition-all duration-300 cursor-pointer text-sm text-neutral-700 dark:text-neutral-400 ">
          <span>View All Articles</span>
          <Icon glyph="enter" size={22} />
        </div>
      </div>
      <BlogList />
    </div>
  );
};

export default BlogPreview;
