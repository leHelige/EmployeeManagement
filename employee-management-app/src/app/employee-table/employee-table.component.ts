import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'employee-table',
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      console.log(data);  
    });
  }

  deleteEmployee(id: number) : void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.employees = this.employees.filter(employee => employee.id !== id);
      },
      error: (err) => {
        console.error('Error during the process: ', err);
      }
    });
  }

}
