import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { EntityModelStudent, StudentEntityService } from "@demo/demo-api";
import { Observable } from "rxjs";

@Injectable()
export class StudentResolver implements Resolve<EntityModelStudent> {
  constructor(private service: StudentEntityService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EntityModelStudent> {
    return this.service.findByIdStudentUsingGET(+route.paramMap.get('id'));
  }

}
