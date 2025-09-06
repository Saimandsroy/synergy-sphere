"use client";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/project-card";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  deadline?: any;
  priority?: string;
  images?: string[];
  manager?: string;
  tags?: string[];
  tasksCount: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));

        const projectPromises = querySnapshot.docs.map(async (doc) => {
          const projectData = doc.data();
          const projectId = doc.id;

          // count tasks for this project
          const tasksQuery = query(
            collection(db, "tasks"),
            where("project", "==", projectId)
          );
          const tasksSnapshot = await getDocs(tasksQuery);

          return {
            id: projectId,
            ...projectData,
            tasksCount: tasksSnapshot.size,
          } as Project;
        });

        const projectsWithTasks = await Promise.all(projectPromises);
        setProjects(projectsWithTasks);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen p-4 flex-1">
      <div className="flex w-full justify-between">
        <h2 className="text-2xl font-bold my-4">Projects</h2>
        <Button asChild>
          <Link href={"/create"}>Add Project</Link>
        </Button>
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="flex gap-4 flex-wrap justify-start">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.name}
                date={
                  project.deadline
                    ? new Date(
                        project.deadline.seconds * 1000
                      ).toLocaleDateString()
                    : "No deadline"
                }
                code={project.priority}
                tasks={project.tasksCount}
                images={project.images || []}
                tags={project.tags || []}
              />
            ))
          ) : (
            <p className="text-gray-500">No projects found</p>
          )}
        </div>
      )}
    </div>
  );
}