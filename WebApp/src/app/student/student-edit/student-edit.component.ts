import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EntityModelStudent, StudentEntityService } from "@demo/demo-api";

@Component({
    selector: 'app-student-edit',
    templateUrl: './student-edit.component.html',
    styleUrls: ['./student-edit.component.scss']
  })
  export class StudentEditComponent implements OnInit {
    public student: EntityModelStudent;
    registerForm: FormGroup;
    submitted = false;

    constructor(
      private formBuilder: FormBuilder,
      private studentService: StudentEntityService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      ) { }

    ngOnInit() {


        this.activatedRoute.data.subscribe((data) => {
            this.student = data.student;
    
            this.registerForm = this.formBuilder.group({
                firstName: [this.student?.firstName, Validators.required],
                lastName: [this.student?.lastName, Validators.required],
                shcoolName: [this.student?.shcoolName, [Validators.required]],
                age: [this.student?.age, [Validators.required]]
            });
        });
    
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        if(this.student) {
          this.studentService
          .saveStudentUsingPUT(this.student.id, this.registerForm.value)
          .subscribe(st => {
              this.router.navigate(["/"]);
          });
        } else {
          this.studentService
          .saveStudentUsingPOST(this.registerForm.value)
          .subscribe(st => {
              this.router.navigate(["/"]);
          });
        }
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

}
  