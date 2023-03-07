import React, { useState } from "react";
import "./styles.css";
import { defaultTasks } from "../../test";
import TaskRow from "./TaskRow";
import axios from "axios";

import { SortableContainer, SortableElement } from "react-sortable-hoc";

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

    const handleChangeValue = (index, newValue) => {
        const arr = [...tasks];
        arr[index].value = newValue;
        setTasks(arr);
    };

    const handleAddTask = () => {
        const arr = [...tasks];
        const lastNestingValue = tasks.at(-1)?.nestingValue ?? 0;
        arr.push({ value: "", nestingValue: lastNestingValue, openInput: true });
        setTasks(arr);
    };

    const handleClearClick = () => {
        setTasks([]);
    };

    const handleSaveClick = async () => {
        try {
            await axios.post(
                "http://localhost:8080/task/saveTasks",
                {
                    tasks,
                },
                { withCredentials: true },
            );
        } catch (error) {
            console.log({ error });
        }
    };

    const handleSortEnd = ({ oldIndex, newIndex }) => {
        const array = [...tasks];
        const [item] = array.splice(oldIndex, 1);
        array.splice(newIndex, 0, item);
        setTasks(array);
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
                <span className="actions">Actions</span>
                <span>Description(click to edit)</span>
            </div>
            <TableBodySortable onSortEnd={handleSortEnd} useDragHandle>
                {tasks.map((task, i) => (
                    <TaskRowSortable
                        key={i}
                        index={i}
                        taskIndex={i}
                        tasks={tasks}
                        handleDeleteTask={handleDeleteTask}
                        handleRightIndent={handleRightIndent}
                        handleLeftIndent={handleLeftIndent}
                        handleChangeValue={handleChangeValue}
                    />
                ))}
            </TableBodySortable>
            <button onClick={handleAddTask}>Add task</button>
        </div>
    );
};

const TaskRowSortable = SortableElement(
    ({
        tasks,
        handleDeleteTask,
        handleLeftIndent,
        handleRightIndent,
        handleChangeValue,
        taskIndex,
    }) => {
        return (
            <TaskRow
                key={taskIndex}
                index={taskIndex}
                tasks={tasks}
                handleDeleteTask={handleDeleteTask}
                handleRightIndent={handleRightIndent}
                handleLeftIndent={handleLeftIndent}
                handleChangeValue={handleChangeValue}
            />
        );
    },
);

const TableBodySortable = SortableContainer(({ children }) => (
    <div className="rows">{children}</div>
));

export default Tasklist;
