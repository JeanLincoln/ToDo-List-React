import { ClipboardText,MaskSad,PlusCircle} from "phosphor-react"
import { useState } from "react"
import {Task} from '../Task/index'
import { Done } from '../Done/index'
import {db , todosCollection} from '../../firebase'
import {collection, getDocs, doc, onSnapshot, addDoc } from "firebase/firestore"
import {v4 as uuidv4} from 'uuid'
import styles from './styles.module.css'

export interface Todo{
    id:number
    content:string
    isChecked:boolean
}



const to = (promise:any) => 
    promise.then((result:Todo) => [null,result]).catch((error:string) =>[error])

export function TasksList(){
    const [todos,setTodos] = useState<Todo[]>([])
    const [newTask, setNewTask] = useState('')
    const [checkedTodos,setCheckedTodos] = useState<Todo[]>([])

    onSnapshot(collection(db,"todos"),
        ({docs}) => {
            const storedTodos:Todo[] = []
            docs.forEach(doc => storedTodos.push(doc.data() as Todo))
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

    async function sendTodoToFirestorage(content:string){
        const [error,result] = await to(addDoc(todosCollection,{
            id:uuidv4(),
            content:content,
            isChecked:false
        })
    )
    console.log(`Todo adicionada, id: ${result.id}`)
    error && console.log(error)
    }

    function insertNewTask(e:any){
        e.preventDefault()
        sendTodoToFirestorage(newTask)
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

    function addTask({id,content, isChecked}:Todo){
          return(  <Task 
                key={id}
                id={id}
                isChecked={isChecked}
                content={content}
                onDeleteTodo={deleteTodo}
                onCheckTodo={handleCheckTodo}
            />
            )
    }

    function doneTask({id,content, isChecked}:Todo){
            return(  <Done 
                  key={id}
                  id={id}
                  isChecked={isChecked}
                  content={content}
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