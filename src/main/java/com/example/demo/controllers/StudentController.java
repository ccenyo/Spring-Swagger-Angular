package com.example.demo.controllers;

import com.example.demo.entities.Student;
import com.example.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    public StudentRepository studentRepository;

    @GetMapping("getAll")
    public List<Student> GetAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("getById")
    public Student GetStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    @DeleteMapping("deleteById")
    public void deleteStudentById(Long id) {
         studentRepository.deleteById(id);
    }
}
