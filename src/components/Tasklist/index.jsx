import React, { useState } from "react";
import "./styles.css";
import { defaultTasks } from "../../test";
import TaskRow from "./TaskRow";
import axios from "axios";

const Tasklist = ({ profile }) => {
    const [tasks, setTasks] = useState(() =>
        profile?.tasks?.length ? profile?.tasks : defaultTasks?.length ? defaultTasks : [],
    );

    const handleDeleteTask = index => {
        const arr = [...tasks];
        let count = 1;
        for (let i = index + 1; i < arr.length; i++) {
            if (arr[i].nestingValue <= arr[index].nestingValue) break;
            count++;
        }
        arr.splice(index, count);
        setTasks(arr);
    };

    const handleRightIndent = index => {
        if (index == 0) return;
        const arr = [...tasks];
        const prevNestingValue = tasks[index].nestingValue;
        arr[index].nestingValue++;
        for (let i = index + 1; i < arr.length; i++) {
            if (arr[i].nestingValue <= prevNestingValue) break;
            arr[i].nestingValue++;
        }
        setTasks(arr);
    };

    const handleLeftIndent = index => {
        const arr = [...tasks];
        const prevNestingValue = tasks[index].nestingValue;
        arr[index].nestingValue--;
        for (let i = index + 1; i < arr.length; i++) {
            if (arr[i].nestingValue <= prevNestingValue) break;
            arr[i].nestingValue--;
        }
        setTasks(arr);
    };

    const handleAddTask = () => {
        const arr = [...tasks];
        const lastNestingValue = tasks.at(-1)?.nestingValue ?? 0;
        arr.push({ value: "newValue", nestingValue: lastNestingValue });
        setTasks(arr);
    };

    const handleClearClick = () => {
        setTasks([]);
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/task/saveTasks",
                {
                    tasks,
                },
                { withCredentials: true },
            );
            console.log({ response });
        } catch (error) {
            console.log({ error });
        }
    };

    return (
        <div className="container">
            <div className="tableTitle">
                <span>List of tasks</span>
                <div className="buttonGroup">
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleClearClick}>Clear</button>
                </div>
            </div>
            <div className="tableHeader">
                <span>Actions</span>
                <span>Description</span>
            </div>
            <div className="rows">
                {tasks.map((task, i) => (
                    <TaskRow
                        key={i}
                        index={i}
                        tasks={tasks}
                        handleDeleteTask={handleDeleteTask}
                        handleRightIndent={handleRightIndent}
                        handleLeftIndent={handleLeftIndent}
                    />
                ))}
            </div>
            <button onClick={handleAddTask}>Add task</button>
        </div>
    );
};

export default Tasklist;
