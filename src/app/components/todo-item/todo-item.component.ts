import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service'
import { __classPrivateFieldSet } from 'tslib';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  onToggle(todo) {
    todo.completed = !todo.completed;
    console.log('toogle');
    this.todoService.toggleCompleted(todo).subscribe( todos => {
      console.log(todos);
    })
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
//    console.log("delete");   
  }
}
