import React, { useRef, useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon, DragIcon } from "../../icons";
import { SortableHandle } from "react-sortable-hoc";
import { getColor } from "../../utils";

const TaskRow = ({
    index,
    tasks,
    handleDeleteTask,
    handleRightIndent,
    handleLeftIndent,
    handleChangeValue,
}) => {
    const formRef = useRef(null);
    const currentTask = tasks[index];
    const [openInput, setOpenInput] = useState(currentTask?.openInput ?? false);
    const previousTask = tasks[index - 1];
    const disableIndentRight =
        currentTask.nestingValue - previousTask?.nestingValue >= 1 || index == 0;
    const disableIndentLeft = currentTask.nestingValue == 0;

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setOpenInput(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [formRef]);

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
            <div
                className="value"
                style={{
                    marginLeft: `${currentTask.nestingValue * 30}px`,
                    borderLeft: `3px solid ${getColor(currentTask.nestingValue)}`,
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                {openInput ? (
                    <form
                        className="input-wrapper"
                        onSubmit={() => setOpenInput(false)}
                        ref={formRef}
                    >
                        <input
                            type="text"
                            value={currentTask.value}
                            onChange={e => handleChangeValue(index, e.target.value)}
                            autoFocus
                            placeholder="Enter description..."
                        />
                    </form>
                ) : (
                    <div
                        className="input"
                        style={{
                            color: `${getColor(currentTask.nestingValue)}`,
                        }}
                        onClick={() => setOpenInput(true)}
                    >
                        {currentTask?.value || "Enter description..."}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskRow;
