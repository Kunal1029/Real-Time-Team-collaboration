//3 column
import initialColumns from "./data.js"
import SingleColumnTask from "./SingleColumnTask.js"

const Column = () => {
//   console.log(initialColumns)
  return (
    <div className="mt-40 border container flex justify-between items-center gap-4 p-5">
      
        {initialColumns.map((x: number)=>(
            <div key={x.id} className="border p-5">
                <h3>{x.name}</h3>
                <SingleColumnTask tsk={x.tasks} />
            </div>
        ))}
      
    </div>
  )
}

export default Column
