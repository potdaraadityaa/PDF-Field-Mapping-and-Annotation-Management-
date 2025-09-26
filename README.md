# PDF Field Mapping and Annotation Management Tool

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot&logoColor=6DB33F)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

A full-stack web application designed to create templates for automated data extraction from PDF documents. This tool provides a user interface to visually map fields on a PDF, save the coordinates and metadata, and later review these mappings with interactive highlighting.

---

## 🚀 Project Summary

This project solves the problem of manual data entry from high-volume, structured documents like invoices, application forms, or reports. It provides a two-phase workflow:

1.  **Mapping Phase:** An administrative user uploads a sample PDF, draws bounding boxes around important data fields (like "Name", "Date", "Total Amount"), and saves this "template" to the database.
2.  **Review Phase:** An executive or reviewer can load a PDF, see all the previously mapped fields highlighted, and click on a list of fields to instantly jump to and highlight the corresponding annotation on the document.

The core purpose is to create the reusable templates that are the essential first step for any large-scale, automated document processing system.

---

## ✨ Features

* **PDF Upload & Rendering:** Upload and view multi-page PDFs directly in the browser.
* **Interactive Annotation:** Click and drag to draw bounding boxes over the rendered PDF pages.
* **Metadata Association:** Link each drawn box to a field name, header, and type via a dynamic form.
* **Staging & Bulk Save:** Prepare a list of multiple annotations for a document and save them all in a single batch operation.
* **Multi-Page Application:** Uses React Router to provide two distinct workflows:
    * `/` - The **Mapping Page** for creating new templates.
    * `/executive` - The **Executive Page** for reviewing existing templates.
* **Data Fetching & Display:** Fetches all saved mappings from the backend and displays them in a clear, interactive list.
* **Interactive Highlighting:** Clicking a field in the review list automatically navigates to the correct PDF page and highlights the corresponding bounding box.
* **Full-Stack CRUD:** Complete Create, Read, Update, and Delete functionality for annotations.

---

## 🛠️ Tech Stack

### Backend
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)
![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Bootstrap](https://img.shields.io/badge/React_Bootstrap-563D7C?style=for-the-badge&logo=react-bootstrap&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Database
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

---

