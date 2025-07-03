import {
  CheckSquare,
  Image,
  List,
  Radio,
  SquareCheckBig,
  Text,
  UploadCloud,
} from "lucide-react";
import React, { useState } from "react";
import { FIELD_TYPES } from "../constants/FieldTypes";

const ICONS = {
  text: Text,
  paragraph: List,
  dropdown: CheckSquare,
  radio: Radio,
  boolean: SquareCheckBig,
  upload: UploadCloud,
  image: Image,
};

const CATEGORIES = {
  "Text Elements": ["text", "paragraph"],
  "Multiple Choice": ["dropdown", "radio", "boolean"],
  "Media Element": ["upload", "image"],
};

function FieldPalette({ onAddField }) {
  const [search, setSearch] = useState("");

  const filterBySearch = (type) => {
    const def = FIELD_TYPES.find((f) => f.type === type);
    return (
      !search ||
      type.toLowerCase().includes(search.toLowerCase()) ||
      def?.label?.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="p-4 rounded-md bg-white shadow space-y-4">
      <div className="flex space-x-2 border-b pb-2">
        <button className="font-semibold text-gray-700 border-b-2 border-black">
          Field
        </button>
      </div>

      <input
        type="text"
        placeholder="Search element"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded text-sm focus:outline-none focus:ring"
      />

      {Object.entries(CATEGORIES).map(([title, types]) => {
        const filteredTypes = types.filter(filterBySearch);
        if (filteredTypes.length === 0) return null;

        return (
          <div key={title}>
            <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase">
              {title}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {filteredTypes.map((type) => {
                const def = FIELD_TYPES.find((f) => f.type === type);
                const Icon = ICONS[type] || Text;
                return (
                  <button
                    key={type}
                    onClick={() => onAddField(type)}
                    className="flex flex-col items-center justify-center p-3 border rounded-md hover:bg-gray-50 text-xs text-gray-700 shadow-sm"
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    {def?.label || type}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FieldPalette;
