"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Calendar,
  User,
  Image as ImageIcon,
} from "lucide-react";
import { format } from "date-fns";

interface TaskCardProps {
  name: string;
  tags: string[];
  deadline?: Date | null;
  assignee?: string;
  imageUrl?: string;
}

export default function TaskCard({
  name,
  tags,
  deadline,
  assignee,
  imageUrl,
}: TaskCardProps) {
  return (
    <Card className="w-80 h-[380px] flex flex-col">
      <CardHeader className="pb-3">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap max-h-12 overflow-hidden">
            {tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold truncate text-foreground">
            {name}
          </h2>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex flex-col flex-1">
        {/* Image OR Placeholder */}
        <div className="mb-4 w-full h-40 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="h-8 w-8 text-muted-foreground opacity-50" />
          )}
        </div>

        {/* Deadline (fixed space, even if empty) */}
        <div className="flex items-center justify-between text-sm text-muted-foreground h-6">
          {deadline ? (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{format(deadline, "dd/MM/yy")}</span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground/70">
              No deadline
            </span>
          )}
        </div>

        {/* Assignee row pinned bottom */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm text-foreground truncate max-w-[140px]">
              {assignee || "Unassigned"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
