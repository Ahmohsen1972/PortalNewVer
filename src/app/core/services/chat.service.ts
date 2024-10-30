import { Injectable } from '@angular/core';
import { HttpEndpointService } from './http-endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private edpoint: HttpEndpointService) {}

  postAttachment(data: any) {
    return this.edpoint.create('fileupload', data);
  }
  getAttachment(id: number) {
    return this.edpoint.getAll(`fileupload/${id}`);
  }
}
