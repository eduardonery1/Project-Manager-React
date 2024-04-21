import logo from './logo.svg';
import './App.css';
import { app, db } from './firebase.js';
import { collection, query, addDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react"


function App() {
  const projectsRef = collection(db, 'projects');
  const q = query(projectsRef);
  const [projects] = useCollectionData(q);

  const [addProject, setAddProject] = useState(false);
  console.log(addProject);
  const handleAddProject = () => {
    setAddProject(!addProject);
  };

  return (
    <div className="App">
      { 
        (projects) 
        ? (projects.map((project, i) => <Project name={project.name} desc={project.desc} key={i}/>))
        : (<p>{"Não há projetos salvos."}</p>)
      }

      {
        (addProject)
        ? <Modal projectsRef={projectsRef} toogle={handleAddProject}/>
        : <button id="add-project" onClick={handleAddProject}>{"+"}</button>
      }
    </div>
  );
} 

function Modal(props){
  const [name, setName] = useState('nome-exemplo');
  const [desc, setDesc] = useState('Essa descrição serve de exemplo.');

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleDescChange = (e) => {
    e.preventDefault();
    setDesc(e.target.value);
  };

  const handleNewProject = async (e) => {
    e.preventDefault();
    await addDoc(props.projectsRef,{
      name: name,
      desc: desc
    });
    props.toogle();
  };

  return (
    <div className='Modal'>
      <button onClick={props.toogle}>{"X"}</button>
      <form onSubmit={handleNewProject}>
        <input type="text" value={name} onChange={handleNameChange}></input>
        <input type="text" value={desc} onChange={handleDescChange}></input>
        <button type="submit">{"+"}</button>
      </form>
    </div>
  );
}

function Project(props){
  return (
    <div className="Project">
        <span>{props.name}</span>
        <p>{props.desc}</p>
    </div>
  )
}

export default App;
