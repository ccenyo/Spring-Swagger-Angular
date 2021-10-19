import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/students',
    pathMatch: 'full'
  },
  {
    path: 'students',
    loadChildren: () => import('./student/student.module').then(mod => mod.StudentModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
