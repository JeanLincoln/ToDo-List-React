import { Trash } from 'phosphor-react'
import styles from './styles.module.css'
import { Todo } from '../TasksList/index'

interface Task{
   id:number
   todoText:string
   isChecked:boolean
   onDeleteTodo:(todo:string)=>void
   onCheckTodo:(todoId:Todo)=>void
}

export function Done({id,todoText,isChecked,onDeleteTodo,onCheckTodo}:Task){

    function handleDeleteTodo(){
        return onDeleteTodo(todoText)
    }

    function handleCheckInput(){
        return onCheckTodo({id,todoText,isChecked})
    }

    return (
        <div className={styles.taskBody}>
            <div className={styles.taskBlock}> 
            <label htmlFor={todoText}></label>
            <input onChange={handleCheckInput} id={todoText} type="checkbox" checked/>
            <p className="taskText">
                {todoText}
            </p>
            </div>
            <button onClick={handleDeleteTodo}>< Trash size={24}/></button>
        </div>
    )
}