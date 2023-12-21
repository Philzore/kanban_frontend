import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  kanbanChannels: any = [];
  currentUser = '' ;
  todo =[];
  inProgress = [];
  testing = [];
  done = [];
  
  constructor(
    private http: HttpClient,

  ) {
    this.loadKanbanChannels();
  }

  checkTokenInStorage(){
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false ;
    }
  }

  loginWithUsernameAndPassword(username:string, password:string) {
    const url = environment.baseUrl + "/login/" ;
    const body = {
      "username": username,
      "password": password
    } ;
    return lastValueFrom(this.http.post(url, body)) ;
  }

  registerNewUser(username:string, password:string, email:string, firstName:string, lastName:string) {
    const url = environment.baseUrl + "/register/" ;
    const body = {
      "username": username,
      "password": password,
      "email" : email,
      "firstName" : firstName,
      "lastName" : lastName,
    } ;
    return lastValueFrom(this.http.post(url, body)) ;
  }

  async loadKanbanChannels() {
    const url = environment.baseUrl + "/board/" ;
    try {
      this.kanbanChannels = await lastValueFrom(this.http.get(url));
    } catch (error) {
      console.log('Fehler laden Channels', error);
    }
  }

  addKanbanChannel(channelName:string) {
    const url = environment.baseUrl + "/board/create_channel/";
    const body = {
      "title" : channelName,
    };
    return lastValueFrom(this.http.post(url,body));
  }

  addTask(taskName:string, assignedTo:string, channelId){
    const url = environment.baseUrl + `/board/${channelId}/add_task/`;
    
    const body = {
      "name" : taskName,
      "assigned" : assignedTo,
    };
    return lastValueFrom(this.http.post(url,body));
  }

  getTasksFromSingleChannel(channelId) {
    const url = environment.baseUrl + `/board/${channelId}/`;

    return lastValueFrom(this.http.get(url));
  }

  saveTaskStates() {

  }
}
