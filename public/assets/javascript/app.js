// ==================================================================
// API Calls for indexedDB.handlebars
// ==================================================================

// ------------------ Eat Burger ---------------------------------

$(".eat-burger").on("click", function (event) {
  var id = $(this).data("id");
  var custId = $("#customer option:selected").attr('data-id');

  if (custId > 0) {

    var customer = {
      customerId: custId
    };

    $.ajax("/api/eat/" + id, {
      type: "PUT",
      data: customer
    }).then(
      function (data) {
        location.reload();
      }
    );

  } else {

    // Modal box to input new customer details then make api call again

    var title = "Eat-Da-Burger";
    var heading = "Welcome to our Restaurant. Enter your name to be sure to get the burger of your choice";

    var content = '<form id="new-customer-form">';
    content = '<div class="form-group">';
    content += '<label for="new-customer-name" class="form-control-label">Name:</label>';
    content += '<input type="text" class="form-control" id="new-customer-name">';
    content += '</div>';
    content += '<div class="form-group">';
    content += '<button type="submit" class="btn btn-primary" data-dismiss="modal" id="modal-close-submit">Submit</button>';
    content += '</div>';
    content += '</form>';

    var html = '<div id="dynamicModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<a class="close" data-dismiss="modal">×</a>';
    html += '<h4>' + title + '</h4>'; //  modal title here
    html += '</div>';
    html += '<div class="modal-body">';
    html += heading + '<br /><br />'; //   modal heading text here
    html += content + '<br />'; //   modal form details here
    html += '</div>';
    html += '<div class="modal-footer">';

    html += '</div>'; // content
    html += '</div>'; // dialog
    html += '</div>'; // footer
    html += '</div>'; // modalWindow

    $('body').append(html);
    $("#dynamicModal").modal();
    $("#dynamicModal").modal('show');

    $('#dynamicModal').on('hidden.bs.modal', function (e) {
      $(this).remove();
    });

    $("#modal-close-submit").on('click', function (event) {
      event.preventDefault();

      var newCust = $('#new-customer-name').val().trim();

      newCustomer = {
         name: newCust
       };

      $.ajax("/api/new", {
        type: "POST",
        data: newCustomer
      }).then(

        function () {

          var title = 'Eat_Da_burger';
          var header = "Welcome";
          var content = "Thank you for joining our restaurant. You can now select your name from the drop down list and finally eat the burger of your choice!";

          var html = '<div id="dynamicModal2" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
          html += '<div class="modal-dialog">';
          html += '<div class="modal-content">';
          html += '<div class="modal-header">';
          html += '<a class="close" data-dismiss="modal">×</a>';
          html += '<h4>' + title + '</h4>'; //  modal title here
          html += '</div>';
          html += '<div class="modal-body">';
          html += header + '<br /><br />'; //   modal heading text here
          html += content + '<br />'; //   modal form details here
          html += '</div>';
          html += '<div class="modal-footer">';
          html += '<button type="button" class="btn btn-secondary" data-dismiss="modal" id="modal-close-submit2">Close</button>';
          html += '</div>'; // footer
          html += '</div>'; // content
          html += '</div>'; // header
          html += '</div>'; // modalWindow

          $('body').append(html);
          $("#dynamicModal2").modal();
          $("#dynamicModal2").modal('show');

          $('#dynamicModal2').on('hidden.bs.modal', function (e) {
            $(this).remove();
            location.reload();
          });

          $("#modal-close-submit2").on('click', function (event) {
          location.reload();
          });
        }
      );
    });

  }

});

// -------------- clear eaten burgers and reset menu -----------------------

$(".reset-menu").on("click", function (event) {
  $.ajax("/api/clear", {
    type: "PUT"
  }).then(
    function (data) {
      location.reload();
    }
  );
});

// ----------------- add a new burger -----------------------------------------

$(".add-form").on("submit", function (event) {
  event.preventDefault();

  var newBurger = {
    name: $("#new").val().trim(),
    devoured: 0
  };

  $.ajax("/api/add", {
    type: "POST",
    data: newBurger
  }).then(
    function () {
      console.log("new burger created");
      location.reload();
    }
  );
});

// -------------------- delete a burger from the menu ------------------------

$(".delete-form").on("submit", function (event) {
  event.preventDefault();

  var delBurger = {
    name: $("#del").val().trim()
  };

  $.ajax("api/delete", {
    type: "DELETE",
    data: delBurger
  }).then(
    function () {
      console.log("Burger deleted");
      location.reload();
    }
  );
});

// ---------- Functions ----------------------