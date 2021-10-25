import { Component, OnInit } from "@angular/core";
import { Student, StudentControllerService } from "@demo/demo-api";


@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss']
  })
  export class StudentListComponent implements OnInit {

    public dataSource: Student [];
    public displayedColumns: string[];

    constructor(private studentService: StudentControllerService) {

    }

    ngOnInit(): void {
      this.displayedColumns= ['firstName', 'lastName', 'age', 'shcoolName', 'actions'];


      this.studentService
      .getAllStudentsUsingGET()
      .subscribe(collection => {
        this.dataSource = collection
      })
    }

    delete(id: number) {
      this.studentService.deleteStudentByIdUsingDELETE(id)
      .subscribe(() => {
        this.studentService
        .getAllStudentsUsingGET()
        .subscribe(collection => {
          this.dataSource = collection
        })
      });
    }

}