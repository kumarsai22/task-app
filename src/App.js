import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://44.202.229.170:5000/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await fetch('http://44.202.229.170:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTask })
    });
    setNewTask('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://44.202.229.170:5000/api/tasks/${id}`, {
      method: 'DELETE'
    });
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditText(task.text);
  };

  const saveEdit = async () => {
    await fetch(`http://44.202.229.170:5000/api/tasks/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText })
    });
    setEditId(null);
    fetchTasks();
  };

 const containerStyle = {
   minHeight: '100vh',
   backgroundColor: '#f0f2f5',
   padding: '40px 20px'
 };

 const cardStyle = {
   maxWidth: '800px',
   margin: '0 auto',
   backgroundColor: 'white',
   borderRadius: '12px',
   boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
   padding: '32px'
 };

 const headerStyle = {
   textAlign: 'center',
   color: '#1a365d',
   fontSize: '2.5rem',
   marginBottom: '32px'
 };

 const inputContainerStyle = {
   display: 'flex',
   gap: '12px',
   marginBottom: '32px'
 };

 const inputStyle = {
   flex: 1,
   padding: '12px 16px',
   borderRadius: '8px',
   border: '2px solid #e2e8f0',
   fontSize: '16px',
   outline: 'none'
 };

 const addButtonStyle = {
   backgroundColor: '#4299e1',
   color: 'white',
   padding: '12px 24px',
   border: 'none',
   borderRadius: '8px',
   fontSize: '16px',
   cursor: 'pointer',
   transition: '0.3s',
   fontWeight: '600'
 };

 const taskItemStyle = {
   backgroundColor: '#f8fafc',
   padding: '16px',
   borderRadius: '8px',
   marginBottom: '12px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   transition: '0.3s',
   border: '1px solid #e2e8f0'
 };

 const actionButtonStyle = (color) => ({
   padding: '8px 16px',
   backgroundColor: color,
   color: 'white',
   border: 'none',
   borderRadius: '6px',
   marginLeft: '8px',
   cursor: 'pointer',
   transition: '0.3s',
   fontSize: '14px'
 });

 // Rest of your existing fetch/CRUD functions...

 return (
   <div style={containerStyle}>
     <div style={cardStyle}>
       <h1 style={headerStyle}>Task Manager</h1>
       
       <div style={inputContainerStyle}>
         <input 
           value={newTask}
           onChange={(e) => setNewTask(e.target.value)}
           placeholder="What needs to be done?"
           style={inputStyle}
         />
         <button 
           onClick={addTask}
           style={addButtonStyle}
         >
           Add Task
         </button>
       </div>

       <div>
         {tasks.map(task => (
           <div key={task._id} style={taskItemStyle}>
             {editId === task._id ? (
               <>
                 <input
                   value={editText}
                   onChange={(e) => setEditText(e.target.value)}
                   style={inputStyle}
                 />
                 <div>
                   <button 
                     onClick={saveEdit}
                     style={actionButtonStyle('#48bb78')}
                   >
                     Save
                   </button>
                   <button 
                     onClick={() => setEditId(null)}
                     style={actionButtonStyle('#718096')}
                   >
                     Cancel
                   </button>
                 </div>
               </>
             ) : (
               <>
                 <span style={{fontSize: '16px'}}>{task.text}</span>
                 <div>
                   <button 
                     onClick={() => startEdit(task)}
                     style={actionButtonStyle('#ecc94b')}
                   >
                     Edit
                   </button>
                   <button 
                     onClick={() => deleteTask(task._id)}
                     style={actionButtonStyle('#f56565')}
                   >
                     Delete
                   </button>
                 </div>
               </>
             )}
           </div>
         ))}
       </div>
     </div>
   </div>
 );
}

export default App;