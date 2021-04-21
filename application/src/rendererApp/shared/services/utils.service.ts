import { Injectable } from '@angular/core';
import UserSignInterface from '../types/userSign.interface'

@Injectable()
export default class UtilsService {
  // range(start: number, end: number): number[] {
  //   const width = end - start;
  //   return [...Array(width > 1 ? width : []).keys()]
  //     .map((element) => element + start);
  // }

  truncStr(str: string, length = 25): string {
    return str.length < length - 3
      ? str 
      : str.substr(0, length - 3) + '...';
  }

  findIndex(source: UserSignInterface[], element: UserSignInterface): number {
    let fIndex = -1;
    // source.forEach((item, index) => {
    //   if (item.dsgId === element.dsgId && item.sign === element.sign) {
    //     console.log(index, 'fIndex')
    //      indereturnx;
    //   }
    // });

    for (let i = 0; i < source.length; i++) {
      if (source[i].dsgId === element.dsgId && source[i].sign === element.sign) {
        fIndex = i;
      }
      
    }

    return fIndex;
  }
}
