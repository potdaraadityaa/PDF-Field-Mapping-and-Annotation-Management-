// src/main/java/com/example/Lalit/model/PdfAnnotationMapping.java
package com.example.Lalit.model;

import jakarta.persistence.*;

@Entity
public class PdfAnnotationMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Database primary key

    private int processId;
    private int formId;
    private int fieldId;
    private String fieldName;
    private String fieldHeader;

    @Embedded // Tells JPA to embed the Bbox fields directly into this table
    private Bbox bbox;

    private int page;
    private double scale;
    private String fieldType;

    @Lob // Specifies that this field can store large objects
    @Column(columnDefinition = "TEXT") // Defines the column type as TEXT for longer strings
    private String metadata; // Storing metadata as a JSON string

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public int getProcessId() { return processId; }
    public void setProcessId(int processId) { this.processId = processId; }
    public int getFormId() { return formId; }
    public void setFormId(int formId) { this.formId = formId; }
    public int getFieldId() { return fieldId; }
    public void setFieldId(int fieldId) { this.fieldId = fieldId; }
    public String getFieldName() { return fieldName; }
    public void setFieldName(String fieldName) { this.fieldName = fieldName; }
    public String getFieldHeader() { return fieldHeader; }
    public void setFieldHeader(String fieldHeader) { this.fieldHeader = fieldHeader; }
    public Bbox getBbox() { return bbox; }
    public void setBbox(Bbox bbox) { this.bbox = bbox; }
    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }
    public double getScale() { return scale; }
    public void setScale(double scale) { this.scale = scale; }
    public String getFieldType() { return fieldType; }
    public void setFieldType(String fieldType) { this.fieldType = fieldType; }
    public String getMetadata() { return metadata; }
    public void setMetadata(String metadata) { this.metadata = metadata; }
}