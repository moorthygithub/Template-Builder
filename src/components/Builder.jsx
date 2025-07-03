import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FieldPalette from "./FieldPalette";
import Section from "./Section";
import { Trash2 } from "lucide-react";

function Builder({
  templates,
  setTemplates,
  activeTemplateId,
  setActiveTemplateId,
}) {
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newSectionName, setNewSectionName] = useState("");
  const [isCreatingSection, setIsCreatingSection] = useState(false);

  const activeTemplate = templates.find((t) => t.id === activeTemplateId);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  // Set default section when template changes
  useEffect(() => {
    if (activeTemplate?.sections?.[0]) {
      setSelectedSectionId(activeTemplate.sections[0].id);
    } else {
      setSelectedSectionId(null);
    }
  }, [activeTemplateId, templates]);

  const handleCreateTemplate = () => {
    if (!newTemplateName.trim()) return;

    const newTemplate = {
      id: uuidv4(),
      name: newTemplateName,
      sections: [],
    };

    setTemplates((prev) => [...prev, newTemplate]);
    setActiveTemplateId(newTemplate.id);
    setIsCreatingTemplate(false);
    setNewTemplateName("");
  };

  const handleCreateSection = () => {
    if (!newSectionName.trim() || !activeTemplate) return;

    const newSection = {
      id: uuidv4(),
      title: newSectionName,
      fields: [],
    };

    const updatedTemplate = {
      ...activeTemplate,
      sections: [...activeTemplate.sections, newSection],
    };

    updateTemplate(updatedTemplate);
    setNewSectionName("");
    setIsCreatingSection(false);
  };

  const updateTemplate = (updatedTemplate) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === updatedTemplate.id ? updatedTemplate : t))
    );
  };

  const deleteTemplate = (id) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    if (id === activeTemplateId) {
      setActiveTemplateId(
        templates.length > 1 ? templates.find((t) => t.id !== id)?.id : null
      );
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Sidebar */}
      <div className="col-span-3 space-y-2">
        {!isCreatingTemplate ? (
          <button
            onClick={() => setIsCreatingTemplate(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full cursor-pointer"
          >
            + Create New Template
          </button>
        ) : (
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              placeholder="Enter template name"
              className="border px-3 py-2 rounded-md"
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={handleCreateTemplate}
                className="bg-green-600 text-white px-4 py-2 rounded-md flex-1"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsCreatingTemplate(false);
                  setNewTemplateName("");
                }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {templates.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between w-full border rounded-md px-3 py-2"
          >
            <button
              onClick={() => setActiveTemplateId(t.id)}
              className={`text-left flex-1 truncate cursor-pointer ${
                t.id === activeTemplateId ? "text-blue-600 font-medium" : ""
              }`}
            >
              {t.name}
            </button>
            <button
              onClick={() => deleteTemplate(t.id)}
              className="text-red-500 text-sm ml-2 hover:text-red-700 cursor-pointer"
              title="Delete Template"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Template Sections */}
      <div className="col-span-6 space-y-4">
        {activeTemplate ? (
          <>
            {activeTemplate.sections.map((section, idx) => (
              <Section
                key={section.id}
                section={section}
                sectionIndex={idx}
                updateTemplate={updateTemplate}
                template={activeTemplate}
              />
            ))}

            {!isCreatingSection ? (
              <button
                onClick={() => setIsCreatingSection(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                + Add Section
              </button>
            ) : (
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  placeholder="Enter section name"
                  className="border px-3 py-2 rounded-md"
                  autoFocus
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleCreateSection}
                    className="bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Save Section
                  </button>
                  <button
                    onClick={() => {
                      setIsCreatingSection(false);
                      setNewSectionName("");
                    }}
                    className="bg-gray-300 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">No template selected.</p>
        )}
      </div>

      <div className="col-span-3 space-y-4">
        {activeTemplate?.sections.length > 0 ? (
          <>
            <label className="block text-sm font-medium text-gray-700">
              Select Section to Add Field
            </label>
            <select
              value={selectedSectionId}
              onChange={(e) => setSelectedSectionId(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            >
              {activeTemplate.sections.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.title}
                </option>
              ))}
            </select>

            <FieldPalette
              onAddField={(type) => {
                const sectionIndex = activeTemplate.sections.findIndex(
                  (s) => s.id === selectedSectionId
                );
                if (sectionIndex === -1) return;

                const updated = { ...activeTemplate };
                const field = {
                  id: uuidv4(),
                  type,
                  label: "",
                  required: false,
                  editing: true,
                  options:
                    type === "dropdown" || type === "radio"
                      ? ["Option 1", "Option 2"]
                      : undefined,
                };

                updated.sections[sectionIndex].fields.push(field);
                updateTemplate(updated);
              }}
            />
          </>
        ) : (
          <p className="text-gray-500">No sections available to add fields.</p>
        )}
      </div>
    </div>
  );
}

export default Builder;
