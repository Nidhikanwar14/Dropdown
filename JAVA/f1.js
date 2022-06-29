$(document).ready(function () {
 
  addNewRow = function () {

    var i=mytable.rows.length;
    if(i<4){
    var newRow = "<tr><td><select id='select1' class='form-control stockCode' name='location'><option value=''>select an item</option><option value='item1'>item1</option><option value='item2'>item2</option><option value='item3'>item3</option></select></td><td> <button id='btn' class='btn btn-danger' onClick='deleteRow(this)' style='margin-left: 250px'>X</button></td></tr>"
    $("#location").append(newRow);
  }i++;
}


// var rowcount= mytable.row.length;
deleteRow = function(element) {

  var row_count = mytable.rows.length;
    if (row_count>2){
    $(element).parent().parent().remove();
    
  }}

});



$(document).ready(function() {
  
  
  var masterList = [];
  var selectedList = [];
  Array.prototype.equals = function (array) {
   
    if (!array)
    return false;
    
    if (this.length != array.length)
    return false;
    
    for (var i = 0, l=this.length; i < l; i++) {
      
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].equals(array[i]))
        return false; 
      }

      else if (this[i] != array[i]) { 
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;   
      }  

    } 
    return true;
  }  


function createMasterList() {
masterList = [];

$('#select').children('option').each(function() {
  masterList.push($(this).val());
});

masterList.shift(); //remove blank value
}
createMasterList(); //used to check if all dropdown values have been selected


function updateSelectedList() {
selectedList = [];
var selectedValue;
$('.stockCode').each(function() {
  selectedValue = $(this).find('option:selected').text();
  if (selectedValue != "" && $.inArray(selectedValue, selectedList) == "-1") {
    selectedList.push(selectedValue);
  }
});
}

 

//disable the dropdown items that have already been selected

function disableAlreadySelected() {
  $('option').each(function() {
    if ($.inArray(this.value, selectedList) != "-1") {
      $(this).attr("disabled", true);
    } else {
      $(this).attr("disabled", false);
    }
  });
}

 

// If all values have been selected, don't let the user add more rows

// function hideAddButtonIfDone() {
//   masterList.sort();
//   selectedList.sort();
//   if (masterList.equals(selectedList)) {
//     console.log("lists equal, hiding add button");
//     $('#mytable #addBtn').hide();
//   }
//   else {
//     console.log("lists not equal, showing add button");
//     $('#mytable #addBtn').show();
//   }
// }

$('#mytable').on('click', '.stockCode', function() {
  
  setTimeout(function() {
    updateSelectedList();
    disableAlreadySelected();
    // hideAddButtonIfDone();
  }, 
  );
});

 

//when a new table row is added, disable the dropdown options that have already been selected

$('#mytable #addBtn').on('click', disableAlreadySelected);

 

//when a table row is removed, update all dropdowns (the removed row's dropdown option will be re-enabled

//in remaining dropdowns

$('#mytable').on('DOMNodeRemoved', '.kx-repeatable > tr', function() {

  updateSelectedList();

  disableAlreadySelected();

  hideAddButtonIfDone();

});

 

});

