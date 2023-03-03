import React from "react";
import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon } from "../../icons";

const TaskRow = ({ index, tasks, handleDeleteTask }) => {
    const currentTask = tasks[index];
    const previousTask = tasks[index - 1];

    return (
        <div className="row">
            <div className="actions">
                <div className={currentTask.nestingValue == 0 ? "button-disabled" : "button"}>
                    <ArrowLeftIcon size="18px" />
                </div>
                <div
                    className={
                        currentTask.nestingValue - previousTask?.nestingValue == 1
                            ? "button-disabled"
                            : "button"
                    }
                >
                    <ArrowRightIcon size="18px" />
                </div>
                <div className="delete-button" onClick={() => handleDeleteTask(index)}>
                    <DeleteIcon size="18px" />
                </div>
            </div>
            <div className="value" style={{ marginLeft: `${currentTask.nestingValue * 30}px` }}>
                {currentTask.value}
            </div>
        </div>
    );
};

export default TaskRow;
