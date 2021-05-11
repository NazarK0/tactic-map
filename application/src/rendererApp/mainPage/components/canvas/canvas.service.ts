import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export default class CanvasService {
    getSvgSource(url: string): Observable<string> {
        return of('<g><rect width="100" height="50" fill="#f36"></rect></g>');
    }
}