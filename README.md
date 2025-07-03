# 🧩 Template Builder – Form Template Designer

A polished, modular **form template builder** built with React, MUI, Tailwind CSS, and `@dnd-kit`. This project allows users to create dynamic form templates with sections, fields, and live previews, and save/submit form data to localStorage.

---

# moorthygithub-template-builder/

├── README.md
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── src/
├── App.jsx
├── App.css
├── index.css
├── main.jsx
├── constants/
│ └── FieldTypes.js
└── components/
├── Builder.jsx
├── FieldEditor.jsx
├── FieldPalette.jsx
├── Form.jsx
├── Navbar.jsx
├── Preview.jsx
├── Section.jsx
└── SortableField.jsx

## 🔧 Features

✅ Create and manage **multiple templates** (maximum of **five templates**) – state managed via **Redux Toolkit**  
✅ Add **sections** and dynamically drag-and-drop fields  
✅ Switch a field's section using dropdown  
✅ **Field types** supported:

- Text
- Paragraph
- Dropdown
- Radio
- Number
- Boolean (checkbox)
- Upload
- Image

✅ **Drag-and-drop** to reorder fields inside sections  
✅ **Field-level editing** and customization  
✅ **Live preview** of the form before use  
✅ Fill form and save user input to **localStorage**  
✅ Reset form after submission  
✅ Responsive, polished UI using **MUI** + **Tailwind CSS**  
✅ Toast notifications via **react-hot-toast**

---

## 🎥 Demo Video

[🔗 Watch the demo](#)

> _(Insert your Loom or YouTube demo link)_

## 🌐 Live URL

**🔗 https://template-builder-t27s.onrender.com/**

---

## 📦 Tech Stack

- **React 19**
- **Vite**
- **Material UI (MUI)**
- **Tailwind CSS**
- **@dnd-kit** (drag-and-drop support)
- **Formik** + **Yup** for form validation
- **Redux Toolkit** for state management
- **Lucide React** for icons
- **react-hot-toast** for user feedback
- **LocalStorage** for persistent template + form data

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/moorthygithub/Template-Builder
cd template-builder
```
