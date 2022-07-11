import '../global.css'
import { Header } from '../Header'
import { TasksList } from '../TasksList'


function App() {
  return ( 
    <>
      <Header />
      <div className="main">
          <TasksList />
      </div>
    </>
  )
}

export default App
