import React, { useState, useEffect } from "react";
import "./styles.css";
import { defaultTasks } from "../../test";
import TaskRow from "./TaskRow";
const Tasklist = () => {
    const [tasks, setTasks] = useState([]);
    console.log({ tasks });
    useEffect(() => {
        setTasks(defaultTasks);
    }, []);

    const handleDeleteTask = index => {
        let arr = tasks;
        let count = 1;
        for (let i = index + 1; i < arr.length; i++) {
            if (arr[i].nestingValue > arr[index].nestingValue) {
                count++;
            }
        }
        console.log({ index, count });
        arr.splice(index, count);
        console.log({ arr });
        setTasks(arr);
    };

    return (
        <div className="container">
            <span className="tableTitle">List of tasks</span>
            <div className="tableHeader">
                <span>Actions</span>
                <span>Description</span>
            </div>
            <div className="rows">
                {tasks.map((task, i) => (
                    <TaskRow key={i} index={i} tasks={tasks} handleDeleteTask={handleDeleteTask} />
                ))}
            </div>
        </div>
    );
};

export default Tasklist;
