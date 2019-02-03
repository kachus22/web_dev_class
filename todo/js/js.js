var body;
window.onload = function get_body() {
  body = document.getElementsByTagName('body')[0];
}

// Function to add element to the list
function onSubmit(input, e){
  if (!e) e = window.event;
  var keyCode = e.keyCode || e.which;
  // Enter pressed
  if (keyCode == '13'){
    // Set ul element
    let ul = input.previousElementSibling.getElementsByTagName('ul')[0];
    // Get last value of input
    let list = ul.getElementsByTagName('li');
    let current = getCurrent(list);
    // Create new li item
    let li = createLi(input.value, current);
    input.value = '';
    ul.appendChild(li);
  }
}

// Function to check status of element
function onChange(e){
  if(e.checked){
    e.nextElementSibling.classList.add('done');
    let li = e.parentNode;
    let ul = li.parentNode.nextElementSibling;
    removeItem(e);
    ul.appendChild(li);
  }
  else{
    e.nextElementSibling.classList.remove('done');
    let li = e.parentNode;
    let ul = li.parentNode.previousElementSibling;
    removeItem(e);
    ul.appendChild(li);
  }
}

// Function to remove element from list
function removeItem(e){
  let li = e.parentNode;
  let ul = li.parentNode;
  ul.removeChild(li);
}

// Function to add a new todo list
function addNote(){
  // Create new container
  let container = document.createElement('div');
  container.classList.add('container');
  // Create title
  let h1 = document.createElement('h1');
  h1.setAttribute('contenteditable', 'true')
  h1.classList.add('title');
  h1.appendChild(document.createTextNode('Título'));
  container.appendChild(h1);
  // Create pin icon
  let pin = document.createElement('i');
  pin.classList.add('fas', 'fa-thumbtack', 'unpinned');
  pin.setAttribute('onclick', 'pinNote(this)');
  container.appendChild(pin);
  // Append div and list
  let div = document.createElement('div');
  div.classList.add('list');
  let selectall = document.createElement('span');
  selectall.classList.add('select');
  selectall.setAttribute('onclick', 'selectAll(this)');
  let textSelect = document.createTextNode('Select All');
  selectall.appendChild(textSelect);
  div.appendChild(selectall);
  let ul = document.createElement('ul');
  let ul2 = document.createElement('ul');
  div.appendChild(ul);
  div.appendChild(ul2);
  // Create input for new elements
  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'newitem');
  input.setAttribute('onkeypress', 'onSubmit(this, event)');
  input.setAttribute('placeholder', ' +    List element');
  container.appendChild(div);
  container.appendChild(input);
  document.getElementById('allnotes').appendChild(container);
}

// Function to remove note
function removeNote(e){
  let category = e.parentNode;
  category.removeChild(e);
}

// Function to change note section pinned/unpinned
function pinNote(e) {
  let note = e.parentNode;
  let section;
  removeNote(note);
  // Change pinned to unpinned and vice versa
  if(e.classList.contains('pinned')){
    // Change note class to unpinned
    e.classList.remove('pinned');
    e.classList.add('unpinned');
    section = document.getElementById('allnotes');
  }
  else{
    // Change note class to pinned
    e.classList.remove('unpinned');
    e.classList.add('pinned');
    section = document.getElementById('pinnednotes');
  }
  section.appendChild(note);
}

// Function to get the current value of the last element
function getCurrent(list){
  if (list.length){
    let last = list.length-1;
    return parseInt(list[last].getElementsByTagName('input')[0].value);
  }
  return 0;
}

// Function to create an input[type: checkbox] element
function createCheckbox(){
  let item = document.createElement('input');
  item.setAttribute('type', 'checkbox');
  item.setAttribute('name', 'todo');
  item.setAttribute('onchange', 'onChange(this)');
  return item;
}

// Fucntion to create an icon to delete element
function createIcon(){
  let icon = document.createElement('i');
  icon.classList.add('fas', 'fa-times');
  icon.setAttribute('onclick', 'removeItem(this)');
  return icon;
}

// Function to create a new li (element)
function createLi(value, current){
  let li = document.createElement('li');
  // Create checkbox and set attributes
  let item = createCheckbox();
  item.value = current+1;
  // Create span for text
  let span = document.createElement('span');
  let itemText = document.createTextNode(value);
  span.appendChild(itemText);
  span.setAttribute('contenteditable', 'true');
  span.setAttribute('onblur', 'edit(this)');
  // Add icon
  let icon = createIcon();
  li.appendChild(item);
  li.appendChild(span);
  li.appendChild(icon);
  return li;
}

// Function to keep track if the element now is empty
// if so, delete it
function editElement(e){
  // Check if blank
  if(!e.innerText.length){
    removeItem(e);
  }
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
