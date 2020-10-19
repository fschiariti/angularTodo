import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
//  todosUrl: string =  'https://jsonplaceholder.typicode.com/todos';
  todosUrl: string =  ' http://localhost:3000/api/todos';

  todosLimit = '?_limit=5'

  constructor(private http: HttpClient) { }


  //Get todo

  getTodo(id: string): Observable<Todo> {
    // TODO: send the message _after_ fetching the hero

    return this.http.get<Todo>(`${this.todosUrl}/${id}`)

  }

  //Get todos

  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`)
  }

  //DeleteTodo

  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`

    return this.http.delete<Todo>(url, httpOptions);
  }

  //Toogle todos

  toggleCompleted(todo: Todo):Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.put(url, todo, httpOptions);
  }

  //Add todos

  addTodo(todo: Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }


  //Update todos

  updateTodo(todo: Todo):Observable<Todo> {

    const url = `${this.todosUrl}/${todo.id}`
    return this.http.put<Todo>(url, todo, httpOptions);
  }



}
