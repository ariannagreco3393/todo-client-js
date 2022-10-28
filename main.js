const taskDiv=document.getElementById("taskDiv");      
const btnNew=document.getElementById("btnNewTask");
const txtTaskName=document.getElementById("txtTaskName");
const divErr=document.getElementById("divErr");

btnNew.addEventListener("click",addTask);

const Url="http://localhost:8080/api/todo";


getAllTasks();        


function getAllTasks() {
    axios.get(Url)
        .then((response) => {
            
            taskDiv.innerHTML=""; 
                   
            const elencoTask=response.data;

            for (let i=0;i<elencoTask.length;i++) {
                const tDiv=document.createElement("div");
                tDiv.innerHTML=elencoTask[i].taskName;     
                const img=document.createElement("img");    
                img.src="img/trash.jpg";
                img.title="Elimina";
                img.width=20;
                img.alt="Elimina";
                img.setAttribute("taskId",elencoTask[i].taskId);        
                img.addEventListener("click",deleteTask);
                tDiv.appendChild(img);
                taskDiv.appendChild(tDiv);   
                
                
            }      
        })
        .catch((error) => {
          
            console.log(error);
        });
}


function addTask() {
    if(txtTaskName.value!="") {
   
        const newTask= {
            name: txtTaskName.value           
        }

        axios.post(Url+"/createtask", newTask)
            .then((response) => {
                getAllTasks();        
                txtTaskName.value="";
            })
            .catch((error) => {
                
                console.log(error);
                divErr.innerHTML="Impossibile inserire il task: "+error.message;
            });
    } else
        alert("inserire un task!");
}

function deleteTask(event) {
  
    let taskId=event.target.getAttribute("taskId");

    axios.delete(Url+"/delete/" + taskId)
    .then((response) => {        
        getAllTasks();                    
        })
    .catch((error) => {
       
        console.log(error);
        divErr.innerHTML="Impossibile inserire il task: "+error.message;
    });

}