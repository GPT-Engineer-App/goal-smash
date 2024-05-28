import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, Checkbox, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newSubtask, setNewSubtask] = useState({});

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false, subtasks: [] }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const addSubtask = (index) => {
    if (newSubtask[index]?.trim() !== "") {
      const updatedTasks = tasks.map((task, i) =>
        i === index
          ? { ...task, subtasks: [...task.subtasks, { text: newSubtask[index], completed: false }] }
          : task
      );
      setTasks(updatedTasks);
      setNewSubtask({ ...newSubtask, [index]: "" });
    }
  };

  const deleteSubtask = (taskIndex, subtaskIndex) => {
    const updatedTasks = tasks.map((task, i) =>
      i === taskIndex
        ? { ...task, subtasks: task.subtasks.filter((_, j) => j !== subtaskIndex) }
        : task
    );
    setTasks(updatedTasks);
  };

  const toggleSubtaskCompletion = (taskIndex, subtaskIndex) => {
    const updatedTasks = tasks.map((task, i) =>
      i === taskIndex
        ? {
            ...task,
            subtasks: task.subtasks.map((subtask, j) =>
              j === subtaskIndex ? { ...subtask, completed: !subtask.completed } : subtask
            ),
          }
        : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} w="100%">
        <HStack w="100%">
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button onClick={addTask} colorScheme="teal">
            Add Task
          </Button>
        </HStack>
        <VStack w="100%" spacing={3}>
          {tasks.map((task, index) => (
            <VStack key={index} w="100%" spacing={3} align="start">
              <HStack w="100%" justifyContent="space-between">
                <Checkbox
                  isChecked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                >
                  <Text as={task.completed ? "s" : ""}>{task.text}</Text>
                </Checkbox>
                <IconButton
                  aria-label="Delete task"
                  icon={<FaTrash />}
                  colorScheme="red"
                  onClick={() => deleteTask(index)}
                />
              </HStack>
              <VStack w="90%" pl={5} spacing={2}>
                {task.subtasks.map((subtask, subIndex) => (
                  <HStack key={subIndex} w="100%" justifyContent="space-between">
                    <Checkbox
                      isChecked={subtask.completed}
                      onChange={() => toggleSubtaskCompletion(index, subIndex)}
                    >
                      <Text as={subtask.completed ? "s" : ""}>{subtask.text}</Text>
                    </Checkbox>
                    <IconButton
                      aria-label="Delete subtask"
                      icon={<FaTrash />}
                      colorScheme="red"
                      onClick={() => deleteSubtask(index, subIndex)}
                    />
                  </HStack>
                ))}
                <HStack w="100%">
                  <Input
                    placeholder="Add a new subtask"
                    value={newSubtask[index] || ""}
                    onChange={(e) => setNewSubtask({ ...newSubtask, [index]: e.target.value })}
                  />
                  <Button onClick={() => addSubtask(index)} colorScheme="blue">
                    Add Subtask
                  </Button>
                </HStack>
              </VStack>
            </VStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;