import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

function Form({ template }) {
  if (!template)
    return <Typography>Select a template to render form</Typography>;

  const initialValues = {};
  const validationSchemaFields = {};

  template.sections.forEach((section) => {
    section.fields.forEach((field) => {
      if (["upload", "image"].includes(field.type)) {
        initialValues[field.id] = null;
        if (field.required) {
          validationSchemaFields[field.id] = Yup.mixed()
            .required("This field is required")
            .test(
              "fileType",
              "File is required",
              (value) => value instanceof File
            );
        }
      } else if (field.type === "boolean") {
        initialValues[field.id] = false;
        if (field.required) {
          validationSchemaFields[field.id] = Yup.boolean().oneOf(
            [true],
            "This field must be checked"
          );
        }
      } else {
        initialValues[field.id] = "";
        if (field.required) {
          validationSchemaFields[field.id] = Yup.string().required(
            "This field is required"
          );
        }
      }
    });
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemaFields),
    onSubmit: (values) => {
      localStorage.setItem(
        `form-submission-${template.id}`,
        JSON.stringify(values)
      );
      toast.success("Form submitted!");
    },
  });

  const handleFileChange = (fieldId, file) => {
    formik.setFieldValue(fieldId, file);
  };
  const getLabel = (field) =>
    field.required ? `${field.label} *` : field.label;

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
    >
      {template.sections.map((section, idx) => (
        <>
          <Box
            key={idx}
            sx={{
              backgroundColor: "#fff",
              p: 3,
              borderRadius: 2,
              boxShadow: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" mb={1}>
              {section.title}
            </Typography>

            {section.fields.map((field) => {
              // const isRequired = Boolean(field.required);
              const error = formik.touched[field.id] && formik.errors[field.id];

              if (field.type === "label_h1")
                return (
                  <Typography
                    key={field.id}
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {field.label}
                  </Typography>
                );

              if (field.type === "label_h2")
                return (
                  <Typography
                    key={field.id}
                    variant="h5"
                    fontWeight="medium"
                    gutterBottom
                  >
                    {field.label}
                  </Typography>
                );

              if (field.type === "label_h3")
                return (
                  <Typography
                    key={field.id}
                    variant="h6"
                    fontWeight="regular"
                    gutterBottom
                  >
                    {field.label}
                  </Typography>
                );

              return (
                <Box key={field.id}>
                  {field.type === "text" && (
                    <TextField
                      fullWidth
                      size="small"
                      label={getLabel(field)}
                      name={field.id}
                      value={formik.values[field.id]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={Boolean(error)}
                      helperText={error}
                    />
                  )}

                  {field.type === "paragraph" && (
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      minRows={4}
                      label={getLabel(field)}
                      name={field.id}
                      value={formik.values[field.id]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={Boolean(error)}
                      helperText={error}
                    />
                  )}

                  {field.type === "number" && (
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label={getLabel(field)}
                      name={field.id}
                      value={formik.values[field.id]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      inputProps={{ min: field.min, max: field.max }}
                      error={Boolean(error)}
                      helperText={error}
                    />
                  )}
                  {field.type === "boolean" && (
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {getLabel(field)}
                      </Typography>
                      <Checkbox
                        name={field.id}
                        checked={formik.values[field.id]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        sx={{ alignSelf: "start" }}
                      />
                      {error && (
                        <Typography variant="caption" color="error">
                          {error}
                        </Typography>
                      )}
                    </Box>
                  )}

                  {field.type === "dropdown" && (
                    <FormControl fullWidth size="small">
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        label={getLabel(field)}
                        name={field.id}
                        value={formik.values[field.id]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(error)}
                      >
                        {field.options?.map((opt, i) => (
                          <MenuItem key={i} value={opt}>
                            {opt}
                          </MenuItem>
                        ))}
                      </Select>
                      {error && (
                        <Typography variant="caption" color="error">
                          {error}
                        </Typography>
                      )}
                    </FormControl>
                  )}

                  {field.type === "radio" && (
                    <FormControl component="fieldset" error={Boolean(error)}>
                      <FormLabel> {getLabel(field)}</FormLabel>
                      <RadioGroup
                        row
                        name={field.id}
                        value={formik.values[field.id]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        {field.options?.map((opt, i) => (
                          <FormControlLabel
                            key={i}
                            value={opt}
                            control={<Radio />}
                            label={opt}
                          />
                        ))}
                      </RadioGroup>
                      {error && (
                        <Typography variant="caption" color="error">
                          {error}
                        </Typography>
                      )}
                    </FormControl>
                  )}

                  {field.type === "upload" || field.type === "image" ? (
                    <Box mt={2}>
                      <Typography variant="body2" gutterBottom>
                        {getLabel(field)}
                      </Typography>

                      <input
                        type="file"
                        accept={field.type === "image" ? "image/*" : "*"}
                        onChange={(e) =>
                          handleFileChange(field.id, e.target.files?.[0])
                        }
                        className="w-full border px-3 py-2 rounded bg-gray-50"
                      />

                      {formik.values[field.id] instanceof File && (
                        <Typography variant="body2" mt={1}>
                          📎 {formik.values[field.id].name}
                        </Typography>
                      )}

                      {error && (
                        <Typography variant="caption" color="error">
                          {error}
                        </Typography>
                      )}
                    </Box>
                  ) : null}
                </Box>
              );
            })}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              sx={{ alignSelf: "flex-start", mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </>
      ))}
    </form>
  );
}

export default Form;
