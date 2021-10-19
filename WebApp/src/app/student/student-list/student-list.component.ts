import { Component, OnInit } from "@angular/core";
import { EntityModelStudent, StudentEntityService } from "@demo/demo-api";


@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss']
  })
  export class StudentListComponent implements OnInit {

    public dataSource: EntityModelStudent [];
    public displayedColumns: string[];

    constructor(private studentService: StudentEntityService) {

    }

    ngOnInit(): void {
      this.displayedColumns= ['firstName', 'lastName', 'age', 'shcoolName'];


      this.studentService
      .findAllStudentUsingGET()
      .subscribe(collection => {
        this.dataSource = collection._embedded.students
      })
    }

}