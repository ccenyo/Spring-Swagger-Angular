import { Routes } from "@angular/router";
import { StudentEditComponent } from "./student-edit/student-edit.component";
import { StudentListComponent } from "./student-list/student-list.component";
import { StudentResolver } from "./student-resolver";

export const studentRoutes: Routes = [
    {
      path: '',
      component: StudentListComponent,
      data: {
        breadcrumb : {
          enabled: true,
          wide: false,
        }
      }
    },
  {
    path: 'details/:id',
    component: StudentEditComponent,
    data: {
      breadcrumb : {
        enabled: true,
        wide: false,
      }
    },
    resolve: {
      student: StudentResolver
    }
  },

  ];
  