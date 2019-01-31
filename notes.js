const fs=require('fs');

console.log('starting notes file');
var fetchNotes=()=>{
  try{
    var notesString=fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  }
catch (e){
return [];
}
};
var saveNotes=(notes)=>{
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};
var addNote=(title,body)=>{
  var notes=fetchNotes();
  var note1={
    title,
    body
  };

  var duplicateNotes=notes.filter((note1) => note1.title==title);
  //ES-6 Feature is used here//
  //real function is : var duplicateNotes=notes.filter((note1)=>{
  //return notes.title===title;
  //});
  if(duplicateNotes.length==0)
  {
    notes.push(note1);
    saveNotes(notes);
    return note1;

  }

};

var getAll=(title,body)=>{
  return fetchNotes();
};

var getNote=(title)=>{

  notes=fetchNotes();
  var readNotes=notes.filter((note1) => note1.title==title);
  return readNotes[0];
};

var removeNote=(title)=>{
  notes=fetchNotes();
  var filteredNotes=notes.filter((note1)=>note1.title!=title );
  saveNotes(filteredNotes);
  return filteredNotes.length!=notes.length;

};
var logNote=(note1)=>{
  debugger;
  console.log(`Title: ${note1.title}`);
  console.log(`Body:  ${note1.body}`);
};

module.exports={
  addNote,
  getAll,
  getNote,
  removeNote,
  saveNotes,
  fetchNotes,
  logNote
};
