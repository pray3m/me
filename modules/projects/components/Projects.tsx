import React, { FC } from "react";
import ProjectCard from "./ProjectCard";
import { ProjectItemProps } from "@/common/utils/types";

const PROJECTS: ProjectItemProps[] = [
  {
    title: "freelanceX",
    slug: "freelanceX",
    description:
      "Freelance Marketplace built with Next.js, Tailwind CSS, Node.js, Prisma, and MongoDB. Developed as a 4th-semester BCA project.",
    image:
      "https://repository-images.githubusercontent.com/123456789/abc123def456gh789ijk012lmn345opq678rstuv901wxyz234",
    links: {
      demo: "https://freelancex.vercel.app",
      github: "https://github.com/pray3m/freelanceX",
    },
    stacks: ["Next.js", "Node.js", "Prisma ORM"],
  },
  {
    title: "orbitcollege",
    slug: "orbitcollege",
    description:
      "A modern education platform built with React, Tailwind CSS, and Firebase, providing online courses and learning management.",
    image:
      "https://repository-images.githubusercontent.com/987654321/zyx987wvu654tsr321qpo098nml765kji432hgf210edcba543",
    links: {
      demo: "https://orbitcollege.vercel.app",
      github: "https://github.com/pray3m/orbitcollege",
    },
    stacks: ["React", "Tailwind CSS", "Firebase"],
  },
  {
    title: "pray3m.dev",
    slug: "pray3m-dev",
    description:
      "My personal portfolio showcasing projects, skills, and contact information. Built with Next.js, Tailwind CSS, and TypeScript.",
    image:
      "https://repository-images.githubusercontent.com/192837465/poi098lkj765mnb432vfr210edcba543",
    links: {
      demo: "https://pray3m.dev",
      github: "https://github.com/pray3m/portfolio",
    },
    stacks: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
];

const Projects: FC = () => {
  return (
    <div className="grid gap-5 pt-2 sm:grid-cols-2">
      {PROJECTS?.map((project: ProjectItemProps, index: number) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
};

export default Projects;
