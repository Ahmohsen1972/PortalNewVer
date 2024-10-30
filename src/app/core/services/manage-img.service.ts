import { Injectable } from '@angular/core';
import { HttpEndpointService } from './http-endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class ManageImgService {
  constructor(private endpoint: HttpEndpointService) {}

  addImg(adsType: string, img: FormData) {
    return this.endpoint.create(`ads-media/${adsType}`, img);
  }
  getImgId(imgId: number) {
    return this.endpoint.getAll(`ads-media/${imgId}`);
  }
  getImgType(adsType: string) {
    return this.endpoint.getAll(`ads-media/search/${adsType}`);
  }
  deleteImg(imgId: number) {
    return this.endpoint.softDelete(`ads-media/${imgId}`);
  }
}
