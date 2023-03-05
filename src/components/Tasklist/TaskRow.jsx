import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon, DragIcon } from "../../icons";
import { SortableHandle } from "react-sortable-hoc";

const TaskRow = ({
    index,
    tasks,
    handleDeleteTask,
    handleRightIndent,
    handleLeftIndent,
    handleChangeValue,
}) => {
    const currentTask = tasks[index];
    const [openInput, setOpenInput] = useState(currentTask?.openInput ?? false);
    const previousTask = tasks[index - 1];
    const disableIndentRight =
        currentTask.nestingValue - previousTask?.nestingValue >= 1 || index == 0;
    const disableIndentLeft = currentTask.nestingValue == 0;

    const DragHandle = SortableHandle(() => (
        <div className="button">
            <DragIcon size="18px" />
        </div>
    ));

    return (
        <div className="row">
            <div className="actions">
                <DragHandle />
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
                {openInput ? (
                    <form className="input-wrapper">
                        <input
                            type="text"
                            value={currentTask.value}
                            onChange={e => handleChangeValue(index, e.target.value)}
                            autoFocus
                        />
                        <button className="button-ok" onClick={() => setOpenInput(false)}>
                            Ok
                        </button>
                    </form>
                ) : (
                    <div className="input" onClick={() => setOpenInput(true)}>
                        {currentTask.value}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskRow;
