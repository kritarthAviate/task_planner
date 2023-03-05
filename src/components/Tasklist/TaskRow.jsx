import React from "react";
import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon } from "../../icons";

const TaskRow = ({ index, tasks, handleDeleteTask, handleRightIndent, handleLeftIndent }) => {
    const currentTask = tasks[index];
    const previousTask = tasks[index - 1];
    const disableIndentRight =
        currentTask.nestingValue - previousTask?.nestingValue >= 1 || index == 0;
    const disableIndentLeft = currentTask.nestingValue == 0;
    return (
        <div className="row">
            <div className="actions">
                <div
                    className={disableIndentLeft ? "button-disabled" : "button"}
                    onClick={() => !disableIndentLeft && handleLeftIndent(index)}
                >
                    <ArrowLeftIcon size="18px" />
                </div>
                <div
                    className={disableIndentRight ? "button-disabled" : "button"}
                    onClick={() => !disableIndentRight && handleRightIndent(index)}
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
