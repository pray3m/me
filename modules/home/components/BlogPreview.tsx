import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import BlogList from "@/modules/blog/components/BlogList";
import Link from "next/link";
import { FC } from "react";
import Icon from "supercons";

const BlogPreview: FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeading
          title="Latest Articles"
          icon={<Icon glyph="rss" size={32} />}
        />
        <SectionSubHeading>
          <Link href="/blog">
            <div className="flex  gap-1 hover:gap-3 transition-all duration-300 cursor-pointer text-sm text-neutral-700 dark:text-neutral-400 hover:text-neutral-700 hover:dark:text-neutral-300">
              <span>View All Articles</span>
              <Icon glyph="enter" size={22} />
            </div>
          </Link>
        </SectionSubHeading>
      </div>
      <BlogList />
    </section>
  );
};

export default BlogPreview;
