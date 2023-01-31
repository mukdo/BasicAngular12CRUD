import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../models/employeeModel';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

 
  formValue !: FormGroup;
  employee: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  
  constructor( private _formbuilder: FormBuilder,
    private _apiService: ApiService) { }

  ngOnInit(): void {
    this.create()
    this.getEmployeeDetails()
  }

  create()
  {
    this.formValue = this._formbuilder.group({
      firstName: ['',[]],
      lastName: ['',[]],
      email:['',[]],
      mobile:['',[]],
      salary:[,[]],

    })
  }

  postEmployeeDetails() {
    this.employee.firstName = this.formValue.value.firstName;
     this.employee.lastName = this.formValue.value.lastName;
     this.employee.email = this.formValue.value.email;
     this.employee.mobile = this.formValue.value.mobile;
     this.employee.salary = this.formValue.value.salary;

     //this._apiService.postEmployee(this.employee)
     this._apiService.postEmployee(this.formValue.value)
     .subscribe(res => {
       console.log(res);
      alert("Employee Added Successfully. ")
      let cancelModal = document.getElementById('cancel')
      cancelModal?.click();
      this.formValue.reset();
      this.getEmployeeDetails();
     },
     err=>
     {
      alert("Employee Can't Added ")
     })
  }
 
  getEmployeeDetails() {
    this._apiService.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
      
    })
  }

  deleteEmployee(item : any){
    let clickedYes = confirm("Are you sure want to delete");
    if(clickedYes){
     this._apiService.deleteEmployee(item.id)
     .subscribe(res=>{
       alert("Deleted Successfully");
       this.getEmployeeDetails();
     })
    }
  }

  editEmployeeDetail(){
    this.employee.firstName = this.formValue.value.firstName;
    this.employee.lastName = this.formValue.value.lastName;
    this.employee.email = this.formValue.value.email;
    this.employee.mobile = this.formValue.value.mobile;
    this.employee.salary = this.formValue.value.salary;
   this._apiService.updateEmployee(this.employee,this.employee.id)
   .subscribe(res=>{
     alert("Updated Successfully")
     let ref = document.getElementById('cancel');
     ref?.click();
     this.getEmployeeDetails();
   })
 }
 onEdit(item : any){
   this.employee.id = item.id;
   this.formValue.controls['firstName'].setValue(item.firstName);
   this.formValue.controls['lastName'].setValue(item.lastName);
   this.formValue.controls['email'].setValue(item.email);
   this.formValue.controls['mobile'].setValue(item.mobile);
   this.formValue.controls['salary'].setValue(item.salary);
   this.showUpdate = true;
   this.showAdd = false;
 }

 clickAddEmployee(){
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate = false;
}

get formVal(){
  return this.formValue.value
}

get formCon(){
  return this.formValue.controls
}

}
