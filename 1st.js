console.log('Starting app');
const aru=require('fs');
const os=require('os');
const notes=require('./notes.js');
const _=require('lodash');
const yargs=require('yargs');
const titleOptions={
  describe:'Title of note',
  demand: true,
  alias:'t'
};
const bodyOptions={
  describe:'Body of note',
  demand:true,
  alias:'b'
};
const argv=yargs
.command('add','Add a note', {
  title: titleOptions,
  body: bodyOptions
})
.command('list','List all notes')
.command('read','read a note',{
  title:titleOptions
})
.command('remove','remove a note',{
  title:titleOptions
})
  .help()
  .argv;
console.log('Process',process.argv);
console.log('Yargs',argv);
var cmd=argv._[0];

if(cmd=='add')
{
var note = notes.addNote(argv.title,argv.body);
if(note) {
  console.log('Note created');
  notes.logNote(note);
}
else{
  console.log('Note is duplicated');
}

}
else if(cmd=='list')
{
  var getAll=notes.getAll();
  console.log(`Printing all the ${getAll.length} notes`);
  getAll.forEach((note1)=> notes.logNote(note1));

}
else if(cmd=='read')
  {
    var read=notes.getNote(argv.title);
    if(read) {
      console.log('Note was read');
      notes.logNote(read);
    }
      else{
        console.log('Note not found');
      }

  }
else if(cmd=='remove')
{
  var removed=notes.removeNote(argv.title);
  if (removed) {
    console.log('Note was removed');
  }
  else{
    console.log('Note not found');
  }
}
else
{
  console.log('command not recognized');
}
