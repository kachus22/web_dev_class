// Fetch data from file
fetch('data/grammys.json')
  .then(function(response) {
    return response.json();
  }).catch(function() {
      console.log("error");
  })
  .then(function(data) {
    // Load data
    loadOptions(data.fields);
    setContent(data.fields[0]);
    changeContent(data.fields);
  });

// Function to load options on select
function loadOptions(data){
  let new_html = "";
  for( let i = 0; i < data.length; i++) {
    new_html += `
      <option value="${data[i].field_id}">
        ${data[i].field}
      </option>
    `;
  }
  $('#category_types').append(new_html);
}

// Function to react to the changes to the selected field
function changeContent(data){
  $("#category_types").on('change', function(event){
    let id = $(this).val()-1;
    let content = data[id];
    setContent(content);
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#category_types").offset().top
    }, 2000);
  });
};

// Function to set the content of the selected field
function setContent(content) {
  // Clear data
  $("#nominees_section").empty();
  let categories = content.categories;
  // Append categories
  let new_html;
  if(content.description){
    new_html = `<h4 class="description">${content.description}<h4>`
    $("#nominees_section").append(new_html);
  }
  categories.forEach(function(category) {
    let new_html = loadCategory(category);
    $("#nominees_section").append(new_html);

  });
}

// Function to load each category
function loadCategory(category){
  let title_html = `<hr>
  <h3 class="category"> ${category.category_name}</h3>
  <h4 class="description">${category.description}</h4>
  `;
  let list_html = `<ul>`;
  let winner_html;
  let winner = category.winner_id;
  category.nominees.forEach(function(nominee, i){
    if(i == winner){
      winner_html = `
        <div class="winner">
          <h4>${nominee.nominee}<span>WINNER!</span></h4>
          <h4>${nominee.artist}</h4>
          <h4>${nominee.info}</h4>
        </div>
        <h4 class="nominees-title">Nominees</h4>
      `;
    }
    else{
      list_html += `
      <li>
        <h4 class="nominee">${nominee.nominee}</h4>
        <h4>${nominee.artist}</h4>
        <h4>${nominee.info}</h4>
      </li>`;
    }
  });
  list_html += `
  </ul>`;
  return title_html + winner_html + list_html;
}

// Function to change to night mode
function switchMode(){
  let container = $('body');
  console.log(container);
  if(container.hasClass('night')){
    container.removeClass('night');
  }
  else{
    container.addClass('night');
  }
}
