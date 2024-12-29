import { PROJECTS } from "@/data/projects";
import { FC } from "react";
import ProjectCard from "./ProjectCard";

const Projects: FC = () => {
  return (
    <div className="grid gap-5 pt-2 sm:grid-cols-2">
      {PROJECTS?.map((project, index: number) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
};

export default Projects;
