import { ClipboardText,PlusCircle} from "phosphor-react"
import { useState } from "react"
import {Task} from '../Task/index'
import styles from './styles.module.css'

export interface Todo{
    id:number
    content:string
    isChecked:boolean
}


export function TasksList(){
    const [todos,setTodos] = useState<Todo[]>([
         {
            id:1,
            content:'Lavar Louça',
            isChecked:false
          },
          {
            id:2,
            content:'Estudar React',
            isChecked:false
          }
    ])
    const [newTask, setNewTask] = useState('')
    const [checkedTodos,setCheckedTodos] = useState<Todo[]>([])

    function renderTasks(){
        if(!todos.length){
            return (
            <div className={styles.tasksList}>
                <ClipboardText size={56}/>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
            </div>)
        }
        return
    }

    function insertNewTask(e:any){
        e.preventDefault()
        const newTodo ={
            id:Math.floor(Math.random()*50),
            content: newTask,
            isChecked:false
        }
        setTodos([...todos, newTodo])
        setNewTask('')
    }

    function handleNewTask(e:any){
       setNewTask(e.target.value)
    }

    function deleteTodo(todoToDelete:string){
        const deleteTodo = todos.filter(todo => todo.content !== todoToDelete)
        const deleteCheckedTodo = checkedTodos.filter(
            todo => todo.content !== todoToDelete)
        setTodos(deleteTodo)
        setCheckedTodos(deleteCheckedTodo)
    }

    function handleCheckTodo(todoToCheck:Todo){
        const itsAlreadyChecked = 
        checkedTodos.some(todo=>todo.id === todoToCheck.id)

        if(itsAlreadyChecked){
        const uncheckTodo = checkedTodos.filter(
            todo => todo.id !== todoToCheck.id)
            
        return setCheckedTodos(uncheckTodo)
        }
        return setCheckedTodos([...checkedTodos,todoToCheck])
    }

    return(
        <div className={styles.tasks}>
         <form 
            onSubmit={insertNewTask}
            className={styles.inputField}>
            <input 
                onChange={handleNewTask}
                value={newTask}
                type="text" 
                placeholder="Adicione uma nova tarefa"/>
            <button>
                Criar 
                <PlusCircle size={16}/>
            </button>
        </form>
            <div className={styles.reports}>
            <p>
                Tarefas criadas 
                <span>{todos.length}</span>
            </p>
            <p>
                Conclúidas 
                <span>{checkedTodos.length}</span>
            </p>
            </div>
            {renderTasks()}
            <div className={styles.Todos}>
            {todos.map(({id,content, isChecked})=>
            <Task 
                key={id}
                id={id}
                isChecked={isChecked}
                content={content}
                onDeleteTodo={deleteTodo}
                onCheckTodo={handleCheckTodo}
            />
        )}
            </div>
        </div>
    )
}