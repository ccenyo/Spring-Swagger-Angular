import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from "@angular/router";
import { StudentEditComponent } from "./student-edit/student-edit.component";
import { StudentListComponent } from "./student-list/student-list.component";
import { studentRoutes } from "./student-routing.module";
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from "@angular/forms";
import { StudentResolver } from "./student-resolver";

@NgModule({
    declarations: [
      StudentEditComponent,
      StudentListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(
            studentRoutes
        ),
        MatTableModule,
        MatIconModule,
        ReactiveFormsModule

    ],
    providers: [
      StudentResolver
    ],
  })
  export class StudentModule { }
  