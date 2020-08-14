import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service'
import { getLocaleExtraDayPeriods } from '@angular/common';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {


  todos: Todo[];


  constructor(private todoService:TodoService) { }

  ngOnInit(): void {

    this.getTodos();
  }

  deleteTodo(todo:Todo) {
    console.log(todo.id);
    //Remove from ui
    this.todos = this.todos.filter(t => t.id !==todo.id)
    //Remove from server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo) {

    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }

  getTodos() {
    this.todoService.getTodos().subscribe( todos => {
      this.todos = todos;
    });    
  }

  searchTodos(todo:Todo) {
    //Search from ui
    if (todo.title) {
      this.todos = this.todos.filter(t=> t.title.indexOf(todo.title) > -1);
    }
    else {
      this.todoService.getTodos().subscribe( todos => {
        this.todos = todos;
      });      
    }
  }

}
