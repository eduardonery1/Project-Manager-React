import logo from './logo.svg';
import './App.css';
import { app } from './firebase.js';
import { useState } from "react"


function App() {
  const [projects, setProjects] = useState([]);
  const [addProject, setAddProject] = useState(false);

  const handleAddProject = () => {
    setAddProject(!addProject);
  };

  return (
    <div className="App">
      { 
        (projects.length !== 0) 
        ? (projects.map((project, i) => <Project name={project.name} desc={project.desc} key={i}/>))
        : (<p>{"Não há projetos salvos."}</p>)
      }

      <button id="add-project" onClick={handleAddProject}>{"+"}</button>
      {addProject? <Modal projects={projects} setProjects={setProjects} toogle={handleAddProject}/>: ''}
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

  const handleNewProject = (e) => {
    e.preventDefault();
    props.setProjects([...props.projects, {
      name: name,
      desc: desc
    }]);
    props.toogle();
  };

  return (
    <div className='Modal'>
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
