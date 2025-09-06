"use client";
import { useEffect, useState } from "react";
import TaskCard from "@/components/task-card";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Task {
  id: string;
  name: string;
  tags: string[];
  deadline?: any;
  assignee?: string;
  imageUrl?: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const tasksData: Task[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen p-4 flex-1">
      <div className=" flex w-full justify-between">
        <h2 className="text-2xl font-bold my-4">Tasks</h2>
        <Button asChild>
          <Link href={"/tasks/create"}>Add Task</Link>
        </Button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="flex gap-4 h-full flex-wrap justify-start">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                name={task.name}
                tags={task.tags || []}
                deadline={task.deadline ? task.deadline.toDate() : null}
                assignee={task.assignee}
                imageUrl={task.imageUrl}
              />
            ))
          ) : (
            <p className="text-gray-500">No tasks found</p>
          )}
        </div>
      )}
    </div>
  );
}
