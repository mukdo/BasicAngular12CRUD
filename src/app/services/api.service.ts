import { Injectable } from '@angular/core';
import{HttpClient, HttpClientModule} from '@angular/common/http'
import{map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseAPIUrl : string = environment.apiBaseUrl;
  
  constructor(private _httpClint: HttpClient) { }

  postEmployee(data: any){
    return this._httpClint.post<any>( this.baseAPIUrl+"posts", data)
    .pipe(map((res:any) =>
    {
      return res;
    }))
  }

  getEmployee(){
    return this._httpClint.get<any>( this.baseAPIUrl+"posts")
    .pipe(map((res:any) =>
    {
      return res;
    }))
  }

  updateEmployee(data: any, id: number){
    return this._httpClint.put<any>( this.baseAPIUrl+"posts/"+id,data)
    .pipe(map((res:any) =>
    {
      return res;
    }))
  }

  deleteEmployee(id: number){
    return this._httpClint.delete<any>( this.baseAPIUrl+"posts/"+id)
    .pipe(map((res:any) =>
    {
      return res;
    }))
  }

}
