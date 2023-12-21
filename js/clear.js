function CLEARCONTACTS(){
    contacts=[];
    return setContacts(contactKey, contacts);
}

function CLEARALLTASKS(){
    allTasks=[];
    return setAllTasks(tasksKey, allTasks);
}