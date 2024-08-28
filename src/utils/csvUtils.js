export const exportToCsv = (tasks, filename) => {
    const csvRows = [];

    const headers = ["ID", "Title", "Description", "Due Date", "Priority", "Status", "History"];
  csvRows.push(headers.join(","));

  tasks.forEach((task) => {
    const { id, title, description, dueDate, priority, status, history } = task;
    const historyStr = history.join("; ").replace(/[\n\r]/g, " ");
    const row = [id, title, description, dueDate, priority, status, `"${historyStr}"`];
    csvRows.push(row.join(","));
  });
  
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};