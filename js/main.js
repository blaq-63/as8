
var tabIndex = 1;

// This function is only called when the HTML document is ready
$("document").ready(function () {
  if (window.confirm("DEAR GRADER PLEASE DOWNLOAD THE REPO AND RUN IT. FOR SOME REASON GITHUB PAGES IS ACTING UP AND I HAVEN'T HAVE THE TIME TO FIX IT.")) {
    window.location.href = "https://github.com/blaq-63/as8.git";
  };


  slider();
  validate();
  auto_submit();
});

/*
  Future me.. This URL will help you: https://stackoverflow.com/questions/1200266/submit-a-form-using-jquery
*/
function auto_submit() {
  // If the form is valid
  if ($("form#mult_form").valid() == true) {
    $("form#mult_form").submit();
  }
}


/*
 *    Saves the current multiplication table into a new tab.
 */
function save_tab() {

  var tabCount = $("#tabs li").length + 1;

  if (tabCount > 24) {
    alert("Only 24 multiplication tables can be saved.");
    return false;
  }

  // This should initialize the jQuery UI tabs.
  $("#tabs").tabs();

  // Get the dimensions of the current table. I've decided to display the Tab title bar for each table as:
  // 0 TO 12 (horizontal beginning to end) by 0 TO 12 (vertical beginning to end)
  var hor_start = Number(document.getElementById('horiz_start').value);
  var hor_end = Number(document.getElementById('horiz_end').value);
  var vert_start = Number(document.getElementById('vert_start').value);
  var vert_end = Number(document.getElementById('vert_end').value);

  tabIndex++;

  // Create the title bar, this will be a string to send to .append()
  var title = "<li class='tab'><a href='#tab-" + tabIndex + "'>" + hor_start +
    " to " + hor_end + " by " + vert_start + " to " + vert_end + "</a>" +
    "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";

  // Add a new Title bar.
  $("div#tabs ul").append(title);

  // Add the current multiplication table.
  $("div#tabs").append('<div id="tab-' + tabIndex + '">' + $("#multiplication_table").html() + '</div>');

  // Refresh the tabs div so that the new tab shows up.
  $("#tabs").tabs("refresh");

  // Make the new tab active, so that the user knows it updated.
  $("#tabs").tabs("option", "active", -1);

  // Add a remove button, from jQuery UI's webpage: https://jqueryui.com/tabs/#manipulation
  $("#tabs").delegate("span.ui-icon-close", "click", function () {
    var panelID = $(this).closest("li").remove().attr("aria-controls");
    $("#" + panelID).remove();

    try {
      $("#tabs").tabs("refresh");
    }
    catch (e) {
      //console.log(e);
    }

    // If this is the last tab, let's reset the page to way it was before.
    // URL: https://api.jqueryui.com/tabs/#method-destroy
    if ($('div#tabs ul li.tab').length == 0) {
      try {
        $("#tabs").tabs("destroy");
      }
      catch (e) {
        //console.log(e);
      }

      return false;
    }
  });
}

function slider() {


  // Horizontal Start Slider
  $("#slider_hor_start").slider({
    min: -12,
    max: 12,
    slide: function (event, ui) {
      $("#horiz_start").val(ui.value);
      auto_submit();  // Call the auto submit function on slide.
    }
  });
  $("#horiz_start").on("keyup", function () {
    $("#slider_hor_start").slider("value", this.value);
    auto_submit();  // Call the auto submit function on keyup as well.
  });

  // Horizontal End Slider
  $("#slider_hor_end").slider({
    min: -12,
    max: 12,
    slide: function (event, ui) {
      $("#horiz_end").val(ui.value);
      auto_submit();
    }
  });
  $("#horiz_end").on("keyup", function () {
    $("#slider_hor_end").slider("value", this.value);
    auto_submit();
  });

  // Vertical Start Slider
  $("#slider_vert_start").slider({
    min: -12,
    max: 12,
    slide: function (event, ui) {
      $("#vert_start").val(ui.value);
      auto_submit();
    }
  });
  $("#vert_start").on("keyup", function () {
    $("#slider_vert_start").slider("value", this.value);
    auto_submit();
  });

  // Vertical End Slider
  $("#slider_vert_end").slider({
    min: -12,
    max: 12,
    slide: function (event, ui) {
      $("#vert_end").val(ui.value);
      auto_submit();
    }
  });
  $("#vert_end").on("keyup", function () {
    $("#slider_vert_end").slider("value", this.value);
    auto_submit();
  });
}


function validate() {
  $("#mult_form").validate({
    rules: {
      horiz_start: {
        number: true,
        min: -12,
        max: 12,
        required: true
      },
      horiz_end: {
        number: true,
        min: -12,
        max: 12,
        required: true
      },
      vert_start: {
        number: true,
        min: -12,
        max: 12,
        required: true
      },
      vert_end: {
        number: true,
        min: -12,
        max: 12,
        required: true
      }
    },

    //Error messages
    messages: {
      horiz_start: {
        number: "Please enter a number between -12 and 12 for the Horizontal start.",
        min: "Please enter a number greater than or equal to -12 for the Horizontal start.",
        max: "Please enter a number less than or equal to 12 for the Horizontal start.",
        required: "A number between -12 and 12 is required for the Horizontal start."
      },
      horiz_end: {
        number: "You did not enter a valid number.<br/>Please enter a number between -12 and 12 for the Horizontal start.",
        min: "Please enter a number greater than or equal to -12 for the Horizontal start.",
        max: "Please enter a number less than or equal to 12 for the Horizontal start.",
        required: "A number between -12 and 12 is required for the Horizontal start."
      },
      vert_start: {
        number: "Please enter a number between -12 and 12 for the Horizontal start.",
        min: "Please enter a number greater than or equal to -12 for the Horizontal start.",
        max: "Please enter a number less than or equal to 12 for the Horizontal start.",
        required: "A number between -12 and 12 is required for the Horizontal start."
      },
      vert_end: {
        number: "Please enter a number between -12 and 12 for the Horizontal start.",
        min: "Please enter a number greater than or equal to -12 for the Horizontal start.",
        max: "Please enter a number less than or equal to 12 for the Horizontal start.",
        required: "A number between -12 and 12 is required for the Horizontal start."
      }
    },

    // This gets called when the form is submitted and valid.
    submitHandler: function () {
      table_calc();
      return false;
    },

    invalidHandler: function () {

      $("#warning_msg").empty();
      $("#multiplication_table").empty();
    },
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.insertAfter(element);
    },

    onkeyup: function (element, event) {
      auto_submit();
    }
  });
}


// This function calculates the multiplication table.
function table_calc() {
  var hor_start = Number(document.getElementById('horiz_start').value);
  var hor_end = Number(document.getElementById('horiz_end').value);
  var vert_start = Number(document.getElementById('vert_start').value);
  var vert_end = Number(document.getElementById('vert_end').value);

  $("#warning_msg").empty();

  // Swap beginning / ending numbers if the start is larger than the beginning.
  if (hor_start > hor_end) {

    // Alert the user that this is happening!
    $("#warning_msg").append("<p class='warning_class'>Swapping the Horizontal start and Horizontal end.</p>");

    var tmp_num = hor_start;
    hor_start = hor_end;
    hor_end = tmp_num;
  }

  // Also swap vertical beginning / ending
  if (vert_start > vert_end) {

    // Alert the user that this is happening!
    $("#warning_msg").append("<p class='warning_class'>Swapping the Vertical start and Vertical end.</p>");

    var tmp_num = vert_start;
    vert_start = vert_end;
    vert_end = tmp_num;
  }

  var matrix = {};

  // Figure out how many rows / columns we have.
  var rows = Math.abs(hor_end - hor_start);
  var columns = Math.abs(vert_end - vert_start);

  // Indexes for the 2D array.
  var horz = hor_start;
  var vert = vert_start;

  for (var x = 0; x <= columns; x++) {
    var tmp_arr = [];

    for (var y = 0; y <= rows; y++) {
      // Calculate the given spot in the multiplication table.
      var calc = horz * vert;
      tmp_arr[y] = calc;
      horz++;
    }

    // Save the current row in the object.
    matrix["row" + x] = tmp_arr;

    horz = hor_start;        // Reset each pass since we're moving down a row.
    vert++;
  }

  // Now we can fill in the table.
  // w3schools is helpful: http://www.w3schools.com/html/html_tables.asp
  var content = "";

  // Opening table tags.
  content += "<table>";

  // First row, and put an empty spot in the top left corner.
  content += "<tr><td></td>";

  // Now fill out the rest of the first row.
  for (var a = hor_start; a <= hor_end; a++) {
    content += "<td>" + a + "</td>";
  }

  // Close the first row.
  content += "</tr>";

  // Print out the left most column using this variable.
  var vert = vert_start;

  // Fill in each row after the first.
  for (var x = 0; x <= columns; x++) {
    // Set the left most column first.
    content += "<tr><td>" + vert + "</td>";

    // Add in all the multiplication for this row.
    for (var y = 0; y <= rows; y++) {
      content += "<td>" + matrix["row" + x][y] + "</td>";
    }
    vert++;

    // Close each row.
    content += "</tr>";
  }

  // Ending table tags.
  content += "</table>";

  // Now the content gets loaded into the HTML page.
  $("#multiplication_table").html(content);

  // Stop the form from refreshing.
  return false;
}
