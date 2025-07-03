import React from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Trash2, Pencil } from "lucide-react";
import { FIELD_TYPES } from "../constants/FieldTypes";

const FieldEditor = ({ field, onChange, onDelete }) => {
  const handleChange = (key, value) => {
    const updatedField = { ...field, [key]: value };
    onChange(updatedField);
  };

  const handleDeleteClick = () => {
    if (confirm("Are you sure you want to delete this field?")) {
      onDelete(field.id);
    }
  };

  const handleDoneClick = () => {
    onChange({ ...field, editing: false });
  };

  const handleEditClick = () => {
    onChange({ ...field, editing: true });
  };

  const fieldTypeLabel =
    FIELD_TYPES.find((f) => f.type === field.type)?.label || "Field";


  const renderFieldSpecificInput = () => {
    switch (field.type) {
      case "text":
        return (
          <Box mt={2}>
            <TextField
              label="Placeholder"
              value={field.placeholder || ""}
              onChange={(e) => handleChange("placeholder", e.target.value)}
              fullWidth
              size="small"
            />
          </Box>
        );
      case "paragraph":
        return (
          <Box mt={2}>
            <TextField
              label="Textarea Placeholder"
              value={field.placeholder || ""}
              onChange={(e) => handleChange("placeholder", e.target.value)}
              fullWidth
              multiline
              rows={3}
              size="small"
            />
          </Box>
        );
      case "dropdown":
      case "radio":
        return (
          <Box mt={2}>
            <TextField
              label="Options (comma separated)"
              value={field.options?.join(", ") || ""}
              onChange={(e) =>
                handleChange(
                  "options",
                  e.target.value.split(",").map((opt) => opt.trim())
                )
              }
              fullWidth
              size="small"
            />
          </Box>
        );
      case "number":
        return (
          <Box mt={2} display="flex" gap={2} flexDirection="column">
            <TextField
              label="Min Value"
              type="number"
              value={field.min || ""}
              onChange={(e) => handleChange("min", e.target.value)}
              fullWidth
              size="small"
            />
            <TextField
              label="Max Value"
              type="number"
              value={field.max || ""}
              onChange={(e) => handleChange("max", e.target.value)}
              fullWidth
              size="small"
            />
          </Box>
        );
      case "boolean":
        return (
          <Box mt={2} className="text-sm text-gray-500">
            This is a checkbox field.
          </Box>
        );
      case "upload":
        return (
          <Box mt={2} className="text-sm text-gray-500">
            Users can upload files.
          </Box>
        );
      case "image":
        return (
          <Box mt={2} className="text-sm text-gray-500">
            Users can upload image.
          </Box>
        );
      default:
        return null;
    }
  };
  if (!field.editing) {
    return (
      <div className="bg-white border rounded-xl shadow-sm p-4 mb-4 flex justify-between items-start">
        <div>
          <div className="font-semibold text-gray-800 text-sm">
            {field.label || "Untitled"}
          </div>
          <div className="text-xs text-gray-500">{fieldTypeLabel}</div>
          {field.required && (
            <div className="text-xs text-red-500 font-medium">Required</div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-sm text-blue-500 hover:underline cursor-pointer"
            onClick={handleEditClick}
          >
            <Pencil size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm border space-y-4 my-4 mr-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-gray-100">
            📄
          </div>
          <span className="font-medium text-sm text-gray-700">
            {fieldTypeLabel}
          </span>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={field.required || false}
              onChange={(e) => handleChange("required", e.target.checked)}
            />
          }
          label={
            <span className="text-sm text-gray-600">Make as required</span>
          }
        />
      </div>

      <TextField
        label="Field Label"
        value={field.label || ""}
        onChange={(e) => handleChange("label", e.target.value)}
        fullWidth
        size="small"
        margin="dense"
      />

      <TextField
        select
        fullWidth
        label="Field Type"
        value={field.type || ""}
        onChange={(e) => handleChange("type", e.target.value)}
        margin="dense"
        size="small"
        SelectProps={{ native: true }}
      >
        <option value="">Select option</option>
        <option value="text">Text</option>
        <option value="paragraph">Paragraph</option>
        <option value="number">Number</option>
        <option value="boolean">Boolean</option>
        <option value="dropdown">Dropdown</option>
        <option value="radio">Radio</option>
        <option value="upload">Upload</option>
        <option value="image">Image</option>
        <option value="label_h1">Label H1</option>
        <option value="label_h2">Label H2</option>
        <option value="label_h3">Label H3</option>
      </TextField>

      {renderFieldSpecificInput()}

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleDeleteClick}
          className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
        >
          <Trash2 size={16} />
          Delete
        </button>

        <button
          type="button"
          onClick={handleDoneClick}
          className="bg-black text-white text-xs font-semibold px-4 py-2 rounded-md cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default FieldEditor;
