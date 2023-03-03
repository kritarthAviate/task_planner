export const defaultTasks = [
    {
        value: "xyz1",
        id: "ab1",
        nestingValue: 0,
        parent: null,
        children: ["ab2", "ab3"],
    },
    {
        value: "xyz2",
        id: "ab2",
        nestingValue: 1,
        parent: "ab1",
        children: [],
    },
    {
        value: "xyz21",
        id: "ab2",
        nestingValue: 2,
        parent: "ab1",
        children: [],
    },
    {
        value: "xyz3",
        id: "ab3",
        nestingValue: 1,
        parent: "ab1",
        children: [],
    },
    {
        value: "xyz4",
        id: "ab4",
        nestingValue: 0,
        parent: null,
        children: [],
    },
];
const nestedArr = [
    {
        id: "ab1",
        value: "xyz1",
        subTasks: [
            {
                id: "ab2",
                value: "xyz2",
                subTasks: [],
            },
            {
                id: "ab3",
                value: "xyz3",
                subTasks: [],
            },
        ],
    },
    {
        id: "ab4",
        value: "xyz4",
        subTasks: [],
    },
];
