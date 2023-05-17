$(function() {

  'use strict';

  // Form

  var contactForm = function() {

    if ($('#contactForm').length > 0) {
      $("#contactForm").validate({
        rules: {
          name: "required",
          email: {
            required: true,
            email: true
          },
          message: {
            required: true,
            minlength: 5
          }
        },
        messages: {
          name: "Introduzca su nombre",
          email: "Introduzca una dirección de correo electrónico válida",
          message: "Introduzca un mensaje con más de 5 caracteres"
        },
        // /* submit via ajax */
        // submitHandler: function(form) {
        //   var $submit = $('.submitting'),
        //     waitText = 'Submitting...';

        //   $.ajax({
        //     type: "POST",
        //     url: "php/send-email.php",
        //     data: $(form).serialize(),

        //     beforeSend: function() {
        //       $submit.css('display', 'block').text(waitText);
        //     },
        //     success: function(msg) {
        //       if (msg == 'OK') {
        //         $('#form-message-warning').hide();
        //         setTimeout(function() {
        //           $('#contactForm').fadeOut();
        //         }, 1000);
        //         setTimeout(function() {
        //           $('#form-message-success').fadeIn();
        //         }, 1400);

        //       } else {
        //         $('#form-message-warning').html(msg);
        //         $('#form-message-warning').fadeIn();
        //         $submit.css('display', 'none');
        //       }
        //     },
        //     error: function() {
        //       $('#form-message-warning').html("Something went wrong. Please try again.");
        //       $('#form-message-warning').fadeIn();
        //       $submit.css('display', 'none');
        //     }
        //   });
        // }

      });
    }
  };
  contactForm();

});
