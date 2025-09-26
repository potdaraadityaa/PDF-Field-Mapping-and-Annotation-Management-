package com.example.Lalit.repository;

import com.example.Lalit.model.PdfAnnotationMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PdfAnnotationMappingRepository extends JpaRepository<PdfAnnotationMapping, Long> {
}