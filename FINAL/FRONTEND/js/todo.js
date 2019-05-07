var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


var todos = document.querySelectorAll("input[type=checkbox]");

function logOut(){
  localStorage.removeItem(token);
  window.location.replace("index.html");
}

// Function to change all elements to done/undone
function selectAll(e){
  // Check option
  let flag = e.innerText == 'Select All' ? true : false;
  let ul;
  // Depending on the flag is from where we are moving our elements
  if(flag){
    ul = e.nextElementSibling;
  }
  else{
    ul = e.nextElementSibling.nextElementSibling;
  }
  // Get list that is going to be changed to the other section
  let list = ul.getElementsByTagName('li');
  while(list.length){
    // Change status to be changed correctly to the other section
    list[0].children[0].checked = !list[0].children[0].checked
    onChange(list[0].children[0]);
  }
  e.innerText = flag ? 'Unselect All' : 'Select All';
}

function deleteTodo(id) {
  // dataType: 'json',
  //     data: json_to_send,
  $.ajax({
      url: 'https://fast-sierra-32301.herokuapp.com/todos/' + id,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'DELETE',
      success: function(data){
        console.log("DELETE!!")
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}

function updateTodo(id, completed) {
  // revisen si completed es booleano o string
  json_to_send = {
    "completed" : completed
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      url: 'https://fast-sierra-32301.herokuapp.com/todos/' + id,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("UPDATE!!")
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}

function updateTodoText(id, text) {
  // revisen si completed es booleano o string
  json_to_send = {
    "description" : text
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      url: 'https://fast-sierra-32301.herokuapp.com/todos/' + id,
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("UPDATE!!")
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}


function loadTodos() {
  $.ajax({
    url: 'https://fast-sierra-32301.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      var count = 0;
      for( let i = 0; i < data.length; i++) {
        addTodo(data[i]._id, data[i].description, data[i].completed)
        if(data[i].completed){
          count++;
        }
      }
      if(count == data.length){
        $('#select-all').text('Unselect All')
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://fast-sierra-32301.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data);
        addTodo(data._id, data.description, data.completed)
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})

function addTodo(id, todoText, completed) {
  var todo = $('#todo ul')
  if(!completed){
    todo.eq(0).append(`<li><input type="checkbox" name="todo" value="${id}" onchange="onChange(this)"><span contenteditable="true" onblur="editTodo(this)">${todoText}</span><i class="fas fa-times" onclick="removeTodo(this)"></i></li>`)
  }
  else{
    var todo = todo.eq(1).append(`<li><input type="checkbox" name="todo" value="${id}" onchange="onChange(this)" checked><span contenteditable="true" onblur="editTodo(this)">${todoText}</span><i class="fas fa-times" onclick="removeTodo(this)"></i></li>`)
    todo.addClass('done');
  }
}

// Function to remove element from list
function removeItem(e){
  let li = e.parentNode;
  let ul = li.parentNode;
  ul.removeChild(li);
}


function removeTodo(e){
  var todo = e.previousElementSibling.previousElementSibling;
  deleteTodo(todo.value);
  let li = e.parentNode;
  let ul = li.parentNode;
  ul.removeChild(li);
}


// Function to check status of element
function onChange(e){
  var todo = $('#todo ul')
  if(e.checked){
    e.nextElementSibling.classList.add('done');
    let li = e.parentNode;
    let ul = li.parentNode.nextElementSibling;
    // removeItem(e);
    ul.appendChild(li);
  }
  else{
    e.nextElementSibling.classList.remove('done');
    let li = e.parentNode;
    let ul = li.parentNode.previousElementSibling;
    removeItem(e);
    ul.appendChild(li);
  }
  updateTodo(e.value, e.checked)
}

// Function to keep track if the element now is empty
// if so, delete it
function editTodo(e){
  // Check if blank
  if(!e.innerText.length){
    removeTodo(e);
  }
  else{
    var todo = e.previousElementSibling
    updateTodoText(todo.value, e.innerText)
  }
}