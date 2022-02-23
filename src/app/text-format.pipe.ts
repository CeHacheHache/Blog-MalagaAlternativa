import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textFormat'
})
export class TextFormatPipe implements PipeTransform {

  transform(value: string, length: number = value.length, split: string = ' '): string {
    if (value.length > length) {
      return value.split(split).slice(0, length).join(split) + '...';
    }
    return value;
  }
}
