import Image from "@/common/components/elements/Image";
import { FC } from "react";

const ProjectDetail: FC<Project> = ({
  title,
  description,
  image,
  slug,
  stacks,
  link_demo,
  link_github,
  updated_at,
}) => {
  return (
    <div>
      <Image
        src={image}
        width={800}
        height={400}
        alt={title}
        className="hover:scale-105"
      />
      <p>{title}</p>
    </div>
  );
};

export default ProjectDetail;
