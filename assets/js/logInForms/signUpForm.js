$(document).ready(function() {
  // ---------------- Name ----------------------
  $('input[id=userName]').keyup(function() {
    // set password variable
    var name = $(this).val();

    //validate only letters and spaces
    if (name.match(/^[a-zA-Z ]+$/)) {
      $('#onlyLetters').removeClass('invalid').addClass('valid');
    } else {
      $('#onlyLetters').removeClass('valid').addClass('invalid');
    }

    //validate the length
    if (name.length < 5) {
      $('#lengthUN').removeClass('valid').addClass('invalid');
    } else {
      $('#lengthUN').removeClass('invalid').addClass('valid');
    }
  }).focus(function() {
    $('#userName_info').show();
  }).blur(function() {
    $('#userName_info').hide();
  });

  // ------------- email ----------------
  $('input[id=userEmail]').keyup(function() {
    // set password variable
    var email = $(this).val();

    //validate an at
    if (email.match(/[@]/)) {
      $('#at').removeClass('invalid').addClass('valid');
    } else {
      $('#at').removeClass('valid').addClass('invalid');
    }

    //validate a dot
    if (email.match(/[.]/)) {
      $('#dot').removeClass('invalid').addClass('valid');
    } else {
      $('#dot').removeClass('valid').addClass('invalid');
    }

    //validate not spaces
    if (email.match(/^\S+$/)) {
      $('#noSpaces').removeClass('invalid').addClass('valid');
    } else {
      $('#noSpaces').removeClass('valid').addClass('invalid');
    }

    //validate format
    if (email.match(/^\S+@\S+\.\S+$/)) {
      $('#format').removeClass('invalid').addClass('valid');
    } else {
      $('#format').removeClass('valid').addClass('invalid');
    }

  }).focus(function() {
    $('#userEmail_info').show();
  }).blur(function() {
    $('#userEmail_info').hide();
  });

  // ---------------- Cohorte ----------------------
  $('input[id=userCohorte]').keyup(function() {
    // set password variable
    var cohorte = $(this).val();

    //validate only letters and spaces
    if (cohorte.match(/^[0-9]*$/)) {
      $('#onlyDigits').removeClass('invalid').addClass('valid');
    } else {
      $('#onlyDigits').removeClass('valid').addClass('invalid');
    }

    //validate the length
    if (cohorte.length > 3 || cohorte.length == 0) {
      $('#charNum').removeClass('valid').addClass('invalid');
    } else {
      $('#charNum').removeClass('invalid').addClass('valid');
    }
  }).focus(function() {
    $('#userCohorte_info').show();
  }).blur(function() {
    $('#userCohorte_info').hide();
  });


  // ---------------- Password -------------------------
  $('input[id=userPassword]').keyup(function() {
    // set password variable
    var pswd = $(this).val();
    //validate the length
    if (pswd.length < 8) {
      $('#length').removeClass('valid').addClass('invalid');
    } else {
      $('#length').removeClass('invalid').addClass('valid');
    }

    //validate letter
    if (pswd.match(/[A-z]/)) {
      $('#letter').removeClass('invalid').addClass('valid');
    } else {
      $('#letter').removeClass('valid').addClass('invalid');
    }

    //validate capital letter
    if (pswd.match(/[A-Z]/)) {
      $('#capital').removeClass('invalid').addClass('valid');
    } else {
      $('#capital').removeClass('valid').addClass('invalid');
    }

    //validate number
    if (pswd.match(/\d/)) {
      $('#number').removeClass('invalid').addClass('valid');
    } else {
      $('#number').removeClass('valid').addClass('invalid');
    }
  }).focus(function() {
    $('#pswd_info').show();
  }).blur(function() {
    $('#pswd_info').hide();
  });
});

// $(function() {

//   'use strict';

//   var signUpForm = function() {

//     if ($('#signUpForm').length > 0) {
//       $("#signUpForm").validate({
//         rules: {
//           userName: {
//             required: true,
//             minlength: 5,
//             maxlength: 30
//           },
//           userEmail: {
//             required: true,
//             email: true
//           },
//           userCohorte: {
//             required: true,
//             digits: true,
//             minlength: 1,
//             maxlength: 3
//           },
//           userPassword: {
//             required: true,
//             minlength: 8,
//             maxlength: 25
//           }
//         },
//         // messages: {
//         //   userName: "Introduzca su nombre",
//         //   userEmail: "Introduzca una dirección de correo electrónico válida",
//         //   userCohorte: "Introduzca el numero de su corte",
//         //   userPassword: "Su contraseña debe tener al menos una mayuscula, una"
//         //     + "minuscula,\nun numero, un simbolo y debe tener al menos 8 caracteres."
//         // },
//       });
//     }
//   };
//   signUpForm();

// });

