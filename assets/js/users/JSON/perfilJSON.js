fetch('users.json')
  .then(response => response.json())
  .then(data => {
    // Aquí puedes trabajar con los datos del archivo JSON  
    console.log(data.name);
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });
