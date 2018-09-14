import { Component, OnInit } from '@angular/core';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-list';
  todos: Todo[] = [];
  constructor() {}

  ngOnInit() {
    if (localStorage.getItem('todoList')) {
      this.loadTodoList();
    }
  }

  getClass(i: number) {
    // tslint:disable-next-line:prefer-const
    let myClass = {
      'panel': true,
      'panel-primary': !this.todos[i].isUrgent,
      'panel-alert': this.todos[i].isUrgent
    };

    return myClass;
  }

  // log(i) {
  //   setTimeout(() => {console.log(this.todos[i].isDone); }, 1000);
  // }

  addTodo(info) {
    const todo: Todo = {
      task: info.task,
      isDone: false,
      isUrgent: info.is_urgent
    };

    this.todos.push(todo);
    this.storeTodoList();

  }

  updateTodoList() {
    this.todos = this.todos.filter((value, index, array) => !value.isDone);
    this.storeTodoList();
  }

  clearTodoList() {
    if (confirm('你确定要删掉所有的任务吗？')) {
      this.todos = [];
      localStorage.removeItem('todoList');
    }

  }

  storeTodoList() {
    localStorage.setItem('todoList', JSON.stringify(this.todos));
  }

  loadTodoList() {
    this.todos = JSON.parse(localStorage.getItem('todoList'));
  }


}
