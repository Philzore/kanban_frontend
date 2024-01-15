import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  kanbanChannels: any = [];
  currentUser = '';
  currentActiveChannel = 0 ; 

  todo = [];
  inProgress = [];
  testing = [];
  done = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.currentUser = localStorage.getItem('user') ;
  }

  /**
   * check if there is a token in the local storage
   * 
   * @returns {bool} - if token exist in local storage
   */
  checkTokenInStorage() {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * send username and password to server
   * 
   * @param username 
   * @param password 
   * @returns response from server
   */
  loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + "/login/";
    const body = {
      "username": username,
      "password": password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return lastValueFrom(this.http.post(url, body, { headers, withCredentials: false }));
  }

  /**
   * send required data for a new user to the server
   * 
   * @param username 
   * @param password 
   * @param email 
   * @param firstName 
   * @param lastName 
   * @returns response from server
   */
  registerNewUser(username: string, password: string, email: string, firstName: string, lastName: string) {
    const url = environment.baseUrl + "/register/";
    const body = {
      "username": username,
      "password": password,
      "email": email,
      "firstName": firstName,
      "lastName": lastName,
    };
    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * get the kanban channels from the server
   * 
   */
  async loadKanbanChannels() {
    const url = environment.baseUrl + "/board/";
    try {
      this.kanbanChannels = await lastValueFrom(this.http.get(url));
    } catch (error) {
      console.log('Fehler laden Channels', error);
      this.router.navigateByUrl('');
    }
  }

  /**
   * add a new kanban channel to the server
   * 
   * @param channelName 
   * @returns response from server
   */
  addKanbanChannel(channelName: string) {
    const url = environment.baseUrl + "/board/create_channel/";
    const body = {
      "title": channelName,
    };
    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * add a new task to the server
   * 
   * @param taskName 
   * @param assignedTo 
   * @param channelId 
   * @returns response from server
   */
  addTask(taskName: string, assignedTo: string, channelId) {
    const url = environment.baseUrl + `/board/${channelId}/add_task/`;

    const body = {
      "name": taskName,
      "assigned": assignedTo,
    };
    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * get task from the active kanban channel from the server
   * 
   * @param channelId 
   * @returns response from server
   */
  getTasksFromSingleChannel(channelId) {
    const url = environment.baseUrl + `/board/${channelId}/`;
    return lastValueFrom(this.http.get(url));
  }

  /**
   * save the curretn state of the kanban board
   * 
   * @param channelId 
   * @returns response from server
   */
  saveTaskStates(channelId) {
    const url = environment.baseUrl + `/board/${channelId}/`;

    const updateData = {
      "to_do": this.todo,
      "in_progress": this.inProgress,
      "testing": this.testing,
      "done": this.done,
    };

    return lastValueFrom(this.http.post(url, updateData));

  }

  /**
   * delete a single kanban channel
   * 
   * @param channelId 
   * @returns response from server
   */
  deleteChannel(channelId) {
    const url = environment.baseUrl + `/board/${channelId}/` ;

    return lastValueFrom(this.http.delete(url));
  }


  editSingleTask(taskID, taskName, taskAssigned) {
    const url = environment.baseUrl + `/edit_task/${taskID}/` ;

    const updateTask = {
      "assigned_to": taskAssigned,
      "title" : taskName,
      // "category": ,
    }

    return lastValueFrom(this.http.put(url, updateTask));
  }

  deleteSingleTask(taskID) {
    const url = environment.baseUrl + `/edit_task/${taskID}/` ;

    return lastValueFrom(this.http.delete(url));
  }
}
