import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

function SortableField({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 mb-2 m-2"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-move text-gray-400 flex items-center justify-center"
      >
        <GripVertical size={18} />
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}

export default SortableField;
