import { Trash } from 'phosphor-react'
import styles from './styles.module.css'
import {Todo} from '../TasksList/index'

interface Task{
   id:string
   content:string
   isChecked:boolean
   onDeleteTodo:(todo:string)=>void
   onCheckTodo:(todoId:Todo)=>void
}

export function Task({id,content,isChecked,onDeleteTodo,onCheckTodo}:Task){

    function handleDeleteTodo(){
        return onDeleteTodo(id)
    }

    function handleCheckInput(){
        return onCheckTodo({id,content,isChecked})
    }

    return (
        <div className={styles.taskBody}>
            <div className={styles.taskBlock}> 
            <label htmlFor={content}></label>
            <input onChange={handleCheckInput} id={content} type="checkbox"/>
            <p className="taskText">
                {content}
            </p>
            </div>
            <button onClick={handleDeleteTodo}>< Trash size={24}/></button>
        </div>
    )
}