const containerElement = document.getElementById('container');
const btnAdd = document.getElementsByClassName('btn-add')[0];

// [{"id":100,"content":"this is first note"},{"id":101,"content":"this is second note"},{"id":102,"content":"this third note"}]

function getAppstorage(){
     return JSON.parse(localStorage.getItem("shylaja-app") || "[]");
}
getAppstorage().forEach(element => {
    const textElement = createTextElement(element.id , element.content);
    containerElement.insertBefore(textElement,btnAdd)
});

function createTextElement(id,content){
 const textElement = document.createElement('textarea');
 textElement.classList.add('sticky');
 textElement.value=content;
 textElement.placeholder="Enter Your notes";

 textElement.addEventListener('change', ()=>{
  updateNote(id,textElement.value)
})
textElement.addEventListener("dblclick",()=>{
    const check=confirm("Are You Sure to Delete ?");
    if(check){
      deleteNotes(id,textElement);
    }
  }); 
 return textElement;
}

// adding new stick notes
function addSticky(){
    const notes = getAppstorage();
    const noteObject = {
        id: Math.floor(Math.random() * 1000),
        content: ""
     }
  const textElement = createTextElement(noteObject.id, noteObject.content);
  containerElement.insertBefore(textElement,btnAdd)
  notes.push(noteObject);
  Savenotes(notes);
}
btnAdd.addEventListener('click',()=> addSticky());

function Savenotes(notes){
    localStorage.setItem("shylaja-app" , JSON.stringify(notes))
}

// updating sticky notes
function updateNote(id,content){
const notes = getAppstorage();
const updateElement=notes.filter((item)=>item.id==id)[0];
updateElement.content=content;
Savenotes(notes);
}

// deleting sticky notes 
function deleteNotes(id,textElement){
    const notes=getAppstorage().filter((note)=>note.id!=id);
    Savenotes(notes);
    containerElement.removeChild(textElement);
  }