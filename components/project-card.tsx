import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Calendar, FileText, User } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  date?: string;
  code?: string; // e.g. priority or short code
  tasks?: number;
  images?: string[];
  tags?: string[];
}

export default function ProjectCard({
  id,
  title,
  date,
  code,
  tasks = 0,
  images = [],
  tags = [],
}: ProjectCardProps) {
  return (
    <Card className="w-80 h-[400px] flex flex-col">
      <CardHeader className="pb-3">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Project Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold truncate text-foreground">
            {title}
          </h2>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
        {/* Image section */}
        <div className="relative mb-4 bg-muted rounded-lg h-32 flex items-center justify-center overflow-hidden">
          {images.length > 0 ? (
            <div className="flex gap-2">
              {images.slice(0, 3).map((img, idx) =>
                img ? (
                  <img
                    key={idx}
                    src={img}
                    alt={`project-img-${idx}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ) : (
                  <div
                    key={idx}
                    className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground"
                  >
                    No Img
                  </div>
                )
              )}
            </div>
          ) : (
            <span className="text-sm text-muted-foreground/70">
              No images uploaded
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{date || "No deadline"}</span>
          </div>
          {code && (
            <div className="flex items-center gap-4">
              <span className="font-medium text-foreground">{code}</span>
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          {/* Always show User icon */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>

          {/* Tasks Count */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{tasks} tasks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
