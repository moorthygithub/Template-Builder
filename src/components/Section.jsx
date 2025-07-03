// Section.jsx
import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableField from "./SortableField";
import FieldEditor from "./FieldEditor";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function Section({ section, sectionIndex, updateTemplate, template }) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = section.fields.findIndex((f) => f.id === active.id);
    const newIndex = section.fields.findIndex((f) => f.id === over.id);
    const reordered = arrayMove(section.fields, oldIndex, newIndex);

    const updated = { ...template };
    updated.sections[sectionIndex].fields = reordered;
    updateTemplate(updated);
  };

  const handleFieldUpdate = (fieldId, newField) => {
    const updated = { ...template };
    updated.sections[sectionIndex].fields = updated.sections[
      sectionIndex
    ].fields.map((f) => (f.id === fieldId ? newField : f));
    updateTemplate(updated);
  };

  const handleDeleteField = (fieldId) => {
    const updated = { ...template };
    updated.sections[sectionIndex].fields = updated.sections[
      sectionIndex
    ].fields.filter((f) => f.id !== fieldId);
    updateTemplate(updated);
  };

  const toggleAllRequired = (checked) => {
    const updated = { ...template };
    updated.sections[sectionIndex].fields = updated.sections[
      sectionIndex
    ].fields.map((f) => ({ ...f, required: checked }));
    updateTemplate(updated);
  };

  const allMarkedRequired = section.fields.every((f) => f.required);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{section.title}</h2>
        <div className="text-gray-500 text-sm">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={allMarkedRequired}
                onChange={(e) => toggleAllRequired(e.target.checked)}
              />
            }
            label={
              <span className="text-sm text-gray-700">
                Mark all fields as required
              </span>
            }
          />
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={section.fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          {section.fields.map((field) => (
            <div
              key={field.id}
              className="mb-6 border border-gray-200 rounded-lg"
            >
              <SortableField id={field.id}>
                <FieldEditor
                  field={field}
                  // onUpdate={(updatedField) =>
                  //   handleFieldUpdate(field.id, updatedField)
                  // }
                  onChange={(updatedField) =>
                    handleFieldUpdate(field.id, updatedField)
                  }
                  onDelete={() => handleDeleteField(field.id)}
                />
              </SortableField>
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default Section;
