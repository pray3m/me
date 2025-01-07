"use client";

import { PROJECTS } from "@/data/projects";
import { FC, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProductCardSkeleton from "@/common/components/skeleton/ProductCardSkeleton";

const Projects: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filteredProjects = PROJECTS.filter((p) => p?.is_visible);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid gap-5 pt-2 sm:grid-cols-2">
      {!isLoading
        ? filteredProjects?.map((project, index: number) => (
            <ProjectCard key={index} {...project} />
          ))
        : [1, 2].map((_, index) => <ProductCardSkeleton key={index} />)}
    </div>
  );
};

export default Projects;
