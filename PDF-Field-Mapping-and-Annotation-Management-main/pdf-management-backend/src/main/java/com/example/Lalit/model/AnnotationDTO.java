package com.example.Lalit.model;

public class AnnotationDTO {
    private Bbox bbox;
    private int page;
    private int field_id;
    private String field_name;
    private String field_header;
    private int process;
    private int form_id;

    // Getters and Setters
    public Bbox getBbox() { return bbox; }
    public void setBbox(Bbox bbox) { this.bbox = bbox; }
    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }
    public int getField_id() { return field_id; }
    public void setField_id(int field_id) { this.field_id = field_id; }
    public String getField_name() { return field_name; }
    public void setField_name(String field_name) { this.field_name = field_name; }
    public String getField_header() { return field_header; }
    public void setField_header(String field_header) { this.field_header = field_header; }
    public int getProcess() { return process; }
    public void setProcess(int process) { this.process = process; }
    public int getForm_id() { return form_id; }
    public void setForm_id(int form_id) { this.form_id = form_id; }
}