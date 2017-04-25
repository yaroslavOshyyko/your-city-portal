import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class VideoService {

    constructor (private http: Http) {}

    getVideoFromChannel(): any {
        const API_URL = 'http://www.googleapis.com/youtube/v3';
        const API_KEY = 'AIzaSyDstuywdQemo7V6TbWbUqt9MyVO03zEe7M';
        const CHANNEL_URL = `${API_URL}/channels?part=contentDetails&forUsername=bvo55&key=${API_KEY}`;
    
        return this.http.get(CHANNEL_URL)
            .flatMap( response => {
                const playlistId = response.json().items[0].contentDetails.relatedPlaylists.uploads;
                const PLAYLIST_URL = `${API_URL}/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${API_KEY}`;
                return this.http.get(PLAYLIST_URL)
            })
            .map( response => response.json().items
                        .map(video => ({
                            url: `https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`,
                            title: video.snippet.title,
                            desription: video.snippet.description
            })))
            .take(1);    
    }
}