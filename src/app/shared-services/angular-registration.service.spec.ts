import { TestBed } from '@angular/core/testing';
import { AngularRegistrationService } from './angular-registration.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {User} from '../shared-models/user.model';

describe('AngularRegistrationService', () => {
  let service: AngularRegistrationService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularRegistrationService,
        HttpClientTestingModule
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AngularRegistrationService);
    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get success response', () => {
    service.register(mockUser).subscribe(res => {
      expect(res).toBeTruthy('Registration failed!');
    });
    const req = httpTestingController.expectOne('http://localhost:3001/api/register');
    expect(req.request.method).toEqual('POST');
    req.flush(testResponse);
  });

  it('should get registered user after registration', () => {
    service.register(mockUser).subscribe(res => {
      expect(res.status).toEqual(200);
      expect(res.user.email).toEqual(mockUser.email);
    });
    const req = httpTestingController.expectOne('http://localhost:3001/api/register');
    expect(req.request.method).toEqual('POST');
    req.flush(testResponse);
  });
});

const mockUser: User =  {
  email: 'mockemail@mockemail.ca',
  firstName: '',
  lastName: '',
  role: '',
  password: '',
  securityQuestion: '',
  securityAnswer: '',
};

const testResponse = {
  status: 200,
  user: mockUser
};
