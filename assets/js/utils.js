// In this file we grouped all the common functions used within the project
/*-------------- Reading elements ----------------*/
function changeHtmlElementsPropById(id, value, prop, testvalue = "none") {
    const element = document.getElementById(id);
    if (testvalue == "none") {
      if (element != null && value != "undefined") {
        element[prop] = value;
      }
    } else {
      // if (element[prop] != testvalue) {
  
        if (element != null && value != "undefined" && element[prop] != testvalue ) {
          element[prop] = value;
        }else if (value != undefined && element != null ){ 
          element[prop] = value;
        }
      // }
    }
  }
  
  function changeHtmlElementsPropByClass(clase, value, prop) {
    const element = document.getElementsByClassName(clase)
    if (element != null) {
      for (const subElement of element) {
        subElement[prop] = value;
      }
    }
  }
  
  function updateStorageObject(location, nameInLocation, newObjectVersion) {
    if (location == "local") {
      localStorage.setItem(nameInLocation, JSON.stringify(newObjectVersion));
    } else {
      sessionStorage.setItem(nameInLocation, JSON.stringify(newObjectVersion));
    }
  }
  const removeMessage = (elementId) => {
    const buttonRef = document.getElementById(elementId);
    console.log("removeMessage  " + buttonRef )
    buttonRef.style.display = "none";
  } 
  const restoreMessage = (elementId) => {
    const buttonRef = document.getElementById(elementId);
    buttonRef.style.display = "inline";
  }
 
  function saveElementsOnObject(id, prop, objectToUpdate ) {
   console.log("entro a la funcion")
   const element = document.getElementById(id).value.trim();
   
     if (element != null && objectToUpdate != "undefined") {
       console.log(objectToUpdate + " " + prop + " " + element)
 
       objectToUpdate[prop] = element;
       console.log("Entro al if de la funcion")
     }
 }

 // exporta la función previamente declarada
/* export { changeHtmlElementsPropById, changeHtmlElementsPropByClass, updateStorageObject, removeMessage, restoreMessage, saveElementsOnObject}; */