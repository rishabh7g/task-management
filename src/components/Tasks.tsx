import { useEffect, useState } from 'react';

// Define a TypeScript interface for the task data
export interface Task {
   userId: number;
   id: number;
   title: string;
   completed: boolean;
}

function Tasks() {
   const [tasks, setTasks] = useState<Task[]>([]);

   useEffect(() => {
      const fetchTasks = async () => {
         try {
            const response = await fetch(
               'https://jsonplaceholder.typicode.com/todos?_limit=10'
            );
            const data: Task[] = await response.json(); // Type assertion for the response data
            setTasks(data);
         } catch (error) {}
      };

      fetchTasks();
   }, []);

   return (
      <div>
         <h1 className='mb-4 text-2xl font-bold'>Tasks</h1>

         <ul>
            {tasks.map((task) => (
               <li key={task.id} className='mb-2'>
                  <input
                     name={task.title}
                     id={`${task.id}`}
                     type='checkbox'
                     checked={task.completed || false}
                     readOnly
                  />
                  <label
                     htmlFor={`${task.id}`}
                     className={task.completed ? 'line-through' : ''}
                  >
                     {task.title}
                  </label>
               </li>
            ))}

            {tasks.length === 0 && <li>No tasks found</li>}
         </ul>
      </div>
   );
}

export default Tasks;
