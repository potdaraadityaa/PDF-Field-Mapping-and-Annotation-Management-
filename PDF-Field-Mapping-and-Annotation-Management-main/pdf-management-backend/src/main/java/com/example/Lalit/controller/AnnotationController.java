package com.example.Lalit.controller;

import com.example.Lalit.model.AnnotationDTO;
import com.example.Lalit.model.FetchTableResponseDTO;
import com.example.Lalit.model.PdfAnnotationMapping;
import com.example.Lalit.repository.PdfAnnotationMappingRepository; // <-- Updated import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/pdf-annotation-mappings")
@CrossOrigin(origins = "http://localhost:5173")
public class AnnotationController {

    // Injecting the new repository
    @Autowired
    private PdfAnnotationMappingRepository repository;


    @GetMapping
    public ResponseEntity<List<PdfAnnotationMapping>> getAllMappings() {
        List<PdfAnnotationMapping> mappings = repository.findAll();
        return ResponseEntity.ok(mappings);
    }


    @PostMapping("/bulk")
    public ResponseEntity<List<PdfAnnotationMapping>> saveMappings(@RequestBody List<PdfAnnotationMapping> mappings) {
        List<PdfAnnotationMapping> savedMappings = repository.saveAll(mappings);
        return ResponseEntity.ok(savedMappings);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PdfAnnotationMapping> updateMapping(@PathVariable Long id, @RequestBody PdfAnnotationMapping mappingDetails) {
        // Find the existing mapping by its ID
        return repository.findById(id)
                .map(existingMapping -> {
                    // Update all the fields with the new data from the request
                    existingMapping.setProcessId(mappingDetails.getProcessId());
                    existingMapping.setFormId(mappingDetails.getFormId());
                    existingMapping.setFieldId(mappingDetails.getFieldId());
                    existingMapping.setFieldName(mappingDetails.getFieldName());
                    existingMapping.setFieldHeader(mappingDetails.getFieldHeader());
                    existingMapping.setBbox(mappingDetails.getBbox());
                    existingMapping.setPage(mappingDetails.getPage());
                    existingMapping.setScale(mappingDetails.getScale());
                    existingMapping.setFieldType(mappingDetails.getFieldType());
                    existingMapping.setMetadata(mappingDetails.getMetadata());

                    // Save the updated entity back to the database
                    PdfAnnotationMapping updatedMapping = repository.save(existingMapping);
                    return ResponseEntity.ok(updatedMapping);
                })
                // If no mapping with that ID is found, return a 404 Not Found response
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnotation(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build(); // HTTP 204 No Content
    }

    @PostMapping("/fetch-create-table")
    public ResponseEntity<List<FetchTableResponseDTO>> fetchCreateTable() {
        // 1. Fetch the raw data from the database
        List<PdfAnnotationMapping> mappings = repository.findAll();

        // 2. Transform the data into the DTO structure
        List<FetchTableResponseDTO> responseList = new java.util.ArrayList<>();
        for (PdfAnnotationMapping mapping : mappings) {
            // Create the nested annotation DTO
            AnnotationDTO annotationDTO = new AnnotationDTO();
            annotationDTO.setBbox(mapping.getBbox());
            annotationDTO.setPage(mapping.getPage());
            annotationDTO.setField_id(mapping.getFieldId());
            annotationDTO.setField_name(mapping.getFieldName());
            annotationDTO.setField_header(mapping.getFieldHeader());
            annotationDTO.setProcess(mapping.getProcessId());
            annotationDTO.setForm_id(mapping.getFormId());

            // Create the main response DTO
            FetchTableResponseDTO responseDTO = new FetchTableResponseDTO();
            responseDTO.setId(mapping.getId());
            responseDTO.setAnnotation(annotationDTO);
            responseDTO.setField_name(mapping.getFieldName());
            responseDTO.setField_type(mapping.getFieldType());
            // Set dummy data for fields not in our model, as per your spec
            responseDTO.setTable_name("table_" + mapping.getProcessId() + "_qc");

            responseList.add(responseDTO);
        }

        // 3. Return the transformed list
        return ResponseEntity.ok(responseList);
    }
}