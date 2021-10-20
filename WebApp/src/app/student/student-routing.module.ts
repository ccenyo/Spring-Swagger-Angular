import { Routes } from "@angular/router";
import { StudentEditComponent } from "./student-edit/student-edit.component";
import { StudentListComponent } from "./student-list/student-list.component";
import { StudentResolver } from "./student-resolver";

export const studentRoutes: Routes = [
    {
      path: '',
      component: StudentListComponent,
      data: {
        
      }
    },
  {
    path: 'edit/:id',
    component: StudentEditComponent,
    data: {

    },
    resolve: {
      student: StudentResolver
    }
  },  {
    path: 'add',
    component: StudentEditComponent,
    data: {

    }
  },

  ];
  