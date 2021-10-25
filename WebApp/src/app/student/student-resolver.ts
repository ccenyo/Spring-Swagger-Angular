import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { EntityModelStudent, StudentControllerService } from "@demo/demo-api";
import { Observable } from "rxjs";

@Injectable()
export class StudentResolver implements Resolve<EntityModelStudent> {
  constructor(private service: StudentControllerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EntityModelStudent> {
    return this.service.getStudentByIdUsingGET(+route.paramMap.get('id'));
  }

}
