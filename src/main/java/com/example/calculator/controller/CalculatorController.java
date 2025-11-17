package com.example.calculator.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.calculator.service.CalculatorService;
import com.example.calculator.model.CalculatorRequest;

//Entry point of our Web Application after main class
@RestController
@RequestMapping("/api/calculator")
public class CalculatorController {

    @Autowired
    private CalculatorService calculatorService;

    @PostMapping("/calculate")
    public double calculateOperation(@RequestBody CalculatorRequest calculatorRequest) {
        return calculatorService.calculate(calculatorRequest.getNum1(), calculatorRequest.getNum2(), calculatorRequest.getOperation());
    }


}
