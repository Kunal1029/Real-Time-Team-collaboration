

const Task = ({ id, title }) => {
  return (
    <div className="p-4 border mb-5">
      <h4>{id}</h4>
      <h4>{title}</h4>
    </div>
  );
};

export default Task;
