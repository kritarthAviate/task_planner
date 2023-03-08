import React, { useState } from "react";
import "./styles.css";
import { defaultTasks } from "../../test";
import TaskRow from "./TaskRow";
import axios from "axios";
import { v4 } from "uuid";

import { SortableContainer, SortableElement } from "react-sortable-hoc";

const Tasklist = ({ profile }) => {
    const [tasks, setTasks] = useState(() =>
        profile?.tasks?.length ? profile?.tasks : defaultTasks?.length ? defaultTasks : [],
    );
    const [loadingSave, setLoadingSave] = useState(false);

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
            setLoadingSave(true);
            // eslint-disable-next-line no-undef
            const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
            await axios.post(
                `${backendUrl}/task/saveTasks`,
                {
                    tasks,
                },
                { withCredentials: true },
            );
        } catch (error) {
            console.log({ error });
        } finally {
            setLoadingSave(false);
        }
    };

    const handleSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex == null || newIndex == null) {
            console.log("Invalid indexes");
            return;
        }
        const array = [...tasks];
        const changeInIndex = newIndex - oldIndex;
        const prevIndexNestedValue = array[newIndex - 1]?.nestingValue ?? 0;
        const oldIndexNestedValue = array[oldIndex].nestingValue;
        if (newIndex == 0 && oldIndexNestedValue != 0) {
            console.log(
                "Illegal move, can't have nesting value of anything other than 0 on the first task.",
            );
            return;
        }
        if (oldIndexNestedValue - prevIndexNestedValue > 1) {
            console.log("Illegal move");
            return;
        }
        let count = 1;
        for (let i = oldIndex + 1; i < array.length; i++) {
            if (array[i].nestingValue <= array[oldIndex].nestingValue) break;
            count++;
        }
        if (changeInIndex > 0 && changeInIndex < count) {
            console.log("Can't move inside child");
            return;
        }
        const item = array.splice(oldIndex, count);
        array.splice(newIndex, 0, ...item);
        setTasks(array);
    };

    return (
        <div className="container">
            <div className="tableTitle">
                <span>List of tasks</span>
                <div className="buttonGroup">
                    <button className="textButton" onClick={handleSaveClick}>
                        {loadingSave ? "Loading..." : "Save"}
                    </button>
                    <button className="textButton" onClick={handleClearClick}>
                        Clear
                    </button>
                </div>
            </div>
            <div className="tableHeader">
                <span className="actions">Actions</span>
                <span>Description(click to edit)</span>
            </div>
            <TableBodySortable onSortEnd={handleSortEnd} useDragHandle>
                {tasks.map((task, i) => {
                    return (
                        <TaskRowSortable
                            key={`item-${i}`}
                            index={i}
                            taskIndex={i}
                            tasks={tasks}
                            handleDeleteTask={handleDeleteTask}
                            handleRightIndent={handleRightIndent}
                            handleLeftIndent={handleLeftIndent}
                            handleChangeValue={handleChangeValue}
                        />
                    );
                })}
            </TableBodySortable>
            <button className="textButton" onClick={handleAddTask}>
                Add task
            </button>
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
