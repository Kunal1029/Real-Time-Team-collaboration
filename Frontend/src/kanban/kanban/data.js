const initialColumns = [
  {
    id: "pending",
    name: "Pending",
    tasks: [
      { id: "task-1", title: "Design login page", status:"pending" },
      { id: "task-2", title: "Fix bug in navbar", status:"pending" },
    ],
  },
  {
    id: "inprogress",
    name: "Inprogress",
    tasks: [
      { id: "task-3", title: "Integrate Firebase Auth", status:"progress" },
      { id: "task-4", title: "Write unit tests", status:"progress" },
    ],
  },
  {
    id: "completed",
    name: "Completed",
    tasks: [
      { id: "task-5", title: "Setup project structure", status:"done" },
      { id: "task-6", title: "Install dependencies", status:"done" },
    ],
  },
];

export default initialColumns;
