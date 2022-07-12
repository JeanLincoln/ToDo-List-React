import { ClipboardText,MaskSad,PlusCircle} from "phosphor-react"
import { useState } from "react"
import {Task} from '../Task/index'
import { Done } from '../Done/index'
import { todosCollection} from "../env"
import {onSnapshot } from "firebase/firestore";
import styles from './styles.module.css'

export interface Todo{
    id:number
    todoText:string
    isChecked:boolean
}

export function TasksList(){
    const [todos,setTodos] = useState<Todo[]>([])
    const [newTask, setNewTask] = useState('')
    const [checkedTodos,setCheckedTodos] = useState<Todo[]>([])
    const storedTodos:Todo[]=[]

    const unsubscribe =  onSnapshot(todosCollection,(snapshot) => {
        snapshot.docChanges().forEach(({ doc, type }) => {
            const docData:Todo = doc.data()
            storedTodos.push(docData)
           
        })
        setTodos(storedTodos)
    })   
    

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

    function renderDones(){
        if(!checkedTodos.length){
            return(
            <div className={styles.noDones}>
                <MaskSad size={60}/>
                <p>Você não tem nenhuma tarefa feita</p>
            </div>
            )
        }
        return <strong>Suas tarefas Cumpridas!</strong>
    }

    function insertNewTask(e:any){
        e.preventDefault()
        const newTodo ={
            id:Math.floor(Math.random()*50),
            todoText: newTask,
            isChecked:false
        }
        setTodos([...todos, newTodo])
        setNewTask('')
    }

    function handleNewTask(e:any){
       setNewTask(e.target.value)
    }

    function deleteTodo(todoToDelete:string){
        const deleteTodo = todos.filter(todo => todo.todoText !== todoToDelete)
        const deleteCheckedTodo = checkedTodos.filter(
            todo => todo.todoText !== todoToDelete)
        setTodos(deleteTodo)
        setCheckedTodos(deleteCheckedTodo)
    }

    function handleCheckTodo(todoToCheck:Todo){
        const itsAlreadyChecked = 
        checkedTodos.some(todo=>todo.id === todoToCheck.id)

        const leftTodos = todos.filter(todo => todo.id !== todoToCheck.id)

        if(itsAlreadyChecked){
        const uncheckTodo = checkedTodos.filter(
            todo => todo.id !== todoToCheck.id)
            
            return (
              setTodos([...todos,todoToCheck]),
             setCheckedTodos(uncheckTodo)
         )
        }
        
        return (
            setTodos(leftTodos),
            setCheckedTodos([...checkedTodos,todoToCheck])
            )
    }

    function addTask({id,todoText, isChecked}:Todo){
          return(  <Task 
                key={id}
                id={id}
                isChecked={isChecked}
                todoText={todoText}
                onDeleteTodo={deleteTodo}
                onCheckTodo={handleCheckTodo}
            />
            )
    }

    function doneTask({id,todoText, isChecked}:Todo){
            return(  <Done 
                  key={id}
                  id={id}
                  isChecked={isChecked}
                  todoText={todoText}
                  onDeleteTodo={deleteTodo}
                  onCheckTodo={handleCheckTodo}
              />
              )
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
            <div className={styles.todos}>
                {todos.map(addTask)}
            </div>
            <div className={styles.dones}>
                <div className={styles.doneList}>
                {renderDones()}
                 
                </div>

                {checkedTodos.map(doneTask)}
            </div>
        </div>
    )
}