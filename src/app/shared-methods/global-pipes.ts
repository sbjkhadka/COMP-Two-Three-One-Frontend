import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {error} from '@angular/compiler/src/util';

// import isImageURL from 'image-url-validator';

@Pipe({
  name: 'DefaultAvatar'
})
export class DefaultAvatarPipe implements PipeTransform{
constructor(private http: HttpClient) {
}

  transform(url: string, fallbackUrl: string) {
  // return this.http.get(url).map(res => url).catch(error => fallbackUrl);
    // return this.http.get(url).pipe(error => return url);

  // }
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
