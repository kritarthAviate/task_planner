const ColorMap = [
    "#1bb0b3",
    "black",
    "grey",
    "orange",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
];

export const getColor = index => ColorMap[index % 50];

export const handleExport = async (data, fileName) => {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const validateImportedTasks = tasks => {
    if (!Array.isArray(tasks)) {
        console.log("array");
        return false;
    }
    if (tasks[0]?.nestingValue !== 0) {
        console.log("firstvalue");
        return false;
    }
    return tasks.every((task, i, array) => {
        if (i == array.length - 1) {
            return true;
        }
        if (array[i + 1].nestingValue - 1 - task.nestingValue <= 1) {
            return true;
        }
    });
};
