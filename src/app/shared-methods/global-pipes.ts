import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'DefaultAvatar'
})
export class DefaultAvatarPipe implements PipeTransform{
constructor() {}

  transform(url: string, fallbackUrl: string) {
    let image = '';
    const img = new Image();
    img.src = url;

    if (url) {
      image = url;
    } else {
      image = fallbackUrl;
    }
    return image;
  }


}
