import { Trash } from 'phosphor-react'
import styles from './styles.module.css'
import { Todo } from '../TasksList/index'

interface Task{
   id:number
   content:string
   isChecked:boolean
   onDeleteTodo:(todo:string)=>void
   onCheckTodo:(todoId:Todo)=>void
}

export function Done({id,content,isChecked,onDeleteTodo,onCheckTodo}:Task){

    function handleDeleteTodo(){
        return onDeleteTodo(content)
    }

    function handleCheckInput(){
        return onCheckTodo({id,content,isChecked})
    }

    return (
        <div className={styles.taskBody}>
            <div className={styles.taskBlock}> 
            <label htmlFor={content}></label>
            <input onChange={handleCheckInput} id={content} type="checkbox" checked/>
            <p className="taskText">
                {content}
            </p>
            </div>
            <button onClick={handleDeleteTodo}>< Trash size={24}/></button>
        </div>
    )
}