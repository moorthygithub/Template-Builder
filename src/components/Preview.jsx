import React from "react";

function Preview({ template }) {
  if (!template) return <div>No template selected</div>;

  return (
    <div className="space-y-6">
      {template.sections.map((section, idx) => (
        <div key={idx} className="bg-white p-5 shadow rounded-md border">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {section.title}
          </h3>

          <div className="space-y-5">
            {section.fields.map((field, fidx) => (
              <div key={fidx}>
                <label className="block font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {field.type === "text" && (
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded bg-gray-50"
                    disabled
                    required={field.required}
                  />
                )}

                {field.type === "paragraph" && (
                  <textarea
                    className="w-full border px-3 py-2 rounded bg-gray-50"
                    rows={3}
                    disabled
                    required={field.required}
                  />
                )}

                {field.type === "dropdown" && (
                  <select
                    className="w-full border px-3 py-2 rounded bg-gray-50"
                    disabled
                    required={field.required}
                  >
                    {field.options?.map((opt, i) => (
                      <option key={i}>{opt}</option>
                    ))}
                  </select>
                )}

                {field.type === "radio" && (
                  <div className="space-y-1">
                    {field.options?.map((opt, i) => (
                      <label key={i} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          disabled
                          required={field.required}
                        />
                        <span className="text-gray-600">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {field.type === "boolean" && (
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" disabled required={field.required} />
                    <span className="text-gray-600">Yes/No</span>
                  </label>
                )}

                {field.type === "upload" && (
                  <input
                    type="file"
                    className="w-full border px-3 py-2 rounded bg-gray-50"
                    disabled
                    required={field.required}
                  />
                )}

                {field.type === "image" && (
                  <div className="w-full border px-3 py-6 rounded bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
                    Image upload preview (disabled)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Preview;
