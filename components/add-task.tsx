"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { db } from "@/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

interface TaskFormProps {
  projectId?: string;
}

interface Project {
  id: string;
  name: string;
}

export default function TaskForm({ projectId }: TaskFormProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);

  // form fields
  const [name, setName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [project, setProject] = useState(projectId || "");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // project list
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData: Project[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as { name: string }),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "tasks"), {
        name,
        assignee,
        project,
        tags: tags.split(",").map((t) => t.trim()),
        deadline: date || null,
        description,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("Task created successfully!");
      setName("");
      setAssignee("");
      setProject(projectId || "");
      setTags("");
      setDate(undefined);
      setDescription("");
      setImageUrl("");
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 max-w-xl mx-auto rounded-2xl shadow-lg border"
    >
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task name"
          required
        />
      </div>

      {/* Assignee */}
      <div className="space-y-2">
        <Label htmlFor="assignee">Assignee</Label>
        <Select value={assignee} onValueChange={setAssignee}>
          <SelectTrigger id="assignee">
            <SelectValue placeholder="Select assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user1">User 1</SelectItem>
            <SelectItem value="user2">User 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project */}
      <div className="space-y-2">
        <Label htmlFor="project">Project</Label>
        {projectId ? (
          <Input id="project" value={projectId} disabled />
        ) : (
          <Select value={project} onValueChange={setProject}>
            <SelectTrigger id="project">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projectsLoading ? (
                <SelectItem value="loading" disabled>
                  Loading projects...
                </SelectItem>
              ) : projects.length > 0 ? (
                projects.map((proj) => (
                  <SelectItem key={proj.id} value={proj.id}>
                    {proj.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>
                  No projects found
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Comma separated tags"
        />
      </div>

      {/* Deadline */}
      <div className="space-y-2">
        <Label>Deadline</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Image URL */}
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.png"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description..."
        />
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Task"}
      </Button>
    </form>
  );
}
