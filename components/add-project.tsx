"use client";
import React, { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function ProjectForm() {
  const [date, setDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);

  // fields
  const [name, setName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [manager, setManager] = useState("");
  const [priority, setPriority] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleTagToggle = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "projects"), {
        name,
        tags,
        manager,
        deadline: date || null,
        priority,
        imageUrl,
        description,
        createdAt: serverTimestamp(),
      });

      alert("Project created successfully!");
      setName("");
      setTags([]);
      setManager("");
      setDate(undefined);
      setPriority("");
      setImageUrl("");
      setDescription("");
    } catch (err) {
      console.error("Error creating project:", err);
      alert("Failed to create project");
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
          placeholder="Project name"
          required
        />
      </div>

      {/* Tags - Multi Selection */}
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2 flex-wrap">
          {["Web", "Mobile", "AI", "Design"].map((tag) => (
            <Button
              key={tag}
              type="button"
              variant={tags.includes(tag) ? "default" : "outline"}
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Project Manager - Single Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="manager">Project Manager</Label>
        <Select value={manager} onValueChange={setManager}>
          <SelectTrigger id="manager">
            <SelectValue placeholder="Select manager" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alice">Alice</SelectItem>
            <SelectItem value="bob">Bob</SelectItem>
            <SelectItem value="charlie">Charlie</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Deadline - Date Picker */}
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

      {/* Priority - Radio */}
      <div className="space-y-2">
        <Label>Priority</Label>
        <RadioGroup
          value={priority}
          onValueChange={setPriority}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low">Low</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="high" id="high" />
            <Label htmlFor="high">High</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Image */}
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image</Label>
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
          placeholder="Project description..."
        />
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Project"}
      </Button>
    </form>
  );
}
