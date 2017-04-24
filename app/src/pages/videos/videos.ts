import { Component } from '@angular/core';
import { VideoService } from './videos.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'videos',
  templateUrl: 'videos.html',
  providers: [VideoService]
})

@Pipe({ name: 'safe' })
export class Videos implements PipeTransform{
  videos: Array<any>;
  
  constructor(private sanitizer: DomSanitizer, private videoService: VideoService) {
    this.videoService.getVideoFromChannel()
      .then(videos => {
        this.videos = videos;
        console.log(this.videos);
      })
  }

  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}