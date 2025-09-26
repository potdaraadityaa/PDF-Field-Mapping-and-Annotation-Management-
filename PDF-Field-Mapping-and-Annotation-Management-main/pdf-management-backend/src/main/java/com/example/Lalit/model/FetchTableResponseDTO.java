package com.example.Lalit.model;

// This is the main DTO that matches your required JSON response structure
public class FetchTableResponseDTO {
    private long id;
    private AnnotationDTO annotation;
    private String table_name;
    private String field_name;
    private String field_type;

    // Getters and Setters
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
    public AnnotationDTO getAnnotation() { return annotation; }
    public void setAnnotation(AnnotationDTO annotation) { this.annotation = annotation; }
    public String getTable_name() { return table_name; }
    public void setTable_name(String table_name) { this.table_name = table_name; }
    public String getField_name() { return field_name; }
    public void setField_name(String field_name) { this.field_name = field_name; }
    public String getField_type() { return field_type; }
    public void setField_type(String field_type) { this.field_type = field_type; }
}