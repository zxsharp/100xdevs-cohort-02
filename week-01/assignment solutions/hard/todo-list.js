/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
    static todos = [];
    add(todo){
      Todo.todos.push(todo);
    }
    remove(indexToRemove){
      Todo.todos.splice(indexToRemove, 1);
    }
    update(index, updatedTodo){
      if(index < Todo.todos.length)
      Todo.todos.splice(index, 1, updatedTodo); 
    }
    getAll(){
      return Todo.todos;
    }
    get(indexOfTodo){
      if(indexOfTodo >= Todo.todos.length)
        return null;
      else
      return Todo.todos[indexOfTodo];
    }
    clear(){
      Todo.todos = [];
    }
}

module.exports = Todo;
