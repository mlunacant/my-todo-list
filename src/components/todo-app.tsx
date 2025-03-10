"use client"

import type React from "react"

import { useState } from "react"
import { Check, Pencil, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

// Define the Task type
type Task = {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  // State for tasks and new task input
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Learn React", completed: true },
    { id: 2, text: "Build a todo app", completed: false },
    { id: 3, text: "Deploy to production", completed: false },
  ])
  const [newTaskText, setNewTaskText] = useState("")
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null)
  const [editingTaskText, setEditingTaskText] = useState("")

  // Generate a new ID for tasks
  const getNextId = () => {
    return tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1
  }

  // Add a new task
  const addTask = () => {
    if (newTaskText.trim() === "") return

    const newTask: Task = {
      id: getNextId(),
      text: newTaskText,
      completed: false,
    }

    setTasks([...tasks, newTask])
    setNewTaskText("")
  }

  // Toggle task completion status
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  // Start editing a task
  const startEditingTask = (task: Task) => {
    setEditingTaskId(task.id)
    setEditingTaskText(task.text)
  }

  // Save edited task
  const saveEditedTask = () => {
    if (editingTaskText.trim() === "") return

    setTasks(tasks.map((task) => (task.id === editingTaskId ? { ...task, text: editingTaskText } : task)))

    setEditingTaskId(null)
    setEditingTaskText("")
  }

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Handle key press in the new task input
  const handleNewTaskKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  // Handle key press in the edit task input
  const handleEditTaskKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEditedTask()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-center">Todo List</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex space-x-2 mb-6">
          <Input
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={handleNewTaskKeyPress}
          />
          <Button onClick={addTask} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-md border ${
                  task.completed ? "bg-muted" : "bg-card"
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    id={`task-${task.id}`}
                  />

                  {editingTaskId === task.id ? (
                    <Input
                      value={editingTaskText}
                      onChange={(e) => setEditingTaskText(e.target.value)}
                      onKeyDown={handleEditTaskKeyPress}
                      autoFocus
                      className="flex-1"
                    />
                  ) : (
                    <label
                      htmlFor={`task-${task.id}`}
                      className={`flex-1 cursor-pointer ${task.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.text}
                    </label>
                  )}
                </div>

                <div className="flex gap-1">
                  {editingTaskId === task.id ? (
                    <Button size="icon" variant="ghost" onClick={saveEditedTask}>
                      <Check className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => startEditingTask(task)}
                      disabled={task.completed}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}

                  <Button size="icon" variant="ghost" onClick={() => deleteTask(task.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>

      <CardFooter className="bg-muted/50 p-4 text-center text-sm text-muted-foreground">
        <div className="w-full flex justify-between items-center">
          <span>
            {tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed
          </span>
          <span>© {new Date().getFullYear()} Todo App</span>
        </div>
      </CardFooter>
    </Card>
  )
}

