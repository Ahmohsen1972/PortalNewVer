import { TestBed } from '@angular/core/testing';
import { HttpEndpointService } from './http-endpoint.service';

describe('HttpEndpointService', () => {
  let service: HttpEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
