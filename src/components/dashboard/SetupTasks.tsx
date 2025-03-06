
import React, { Component } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface SetupTask {
  id: number;
  title: string;
  completed: boolean;
}

interface SetupTasksProps {
  setupTasks: SetupTask[];
  setupProgress: number;
  onStartTask: (taskId: number) => void;
}

interface SetupTasksState {}

export class SetupTasks extends Component<SetupTasksProps, SetupTasksState> {
  render() {
    const { setupTasks, setupProgress, onStartTask } = this.props;
    const completedTasks = setupTasks.filter(task => task.completed).length;
    
    return (
      <Card id="setup-tasks">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Getting Started</CardTitle>
          <CardDescription>
            Complete these tasks to get the most out of Shiftly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Setup progress</span>
                <span className="font-medium">
                  {completedTasks}/{setupTasks.length} tasks
                </span>
              </div>
              <Progress value={setupProgress} className="h-2" />
            </div>
            
            <div className="space-y-3">
              {setupTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div 
                    className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 ${
                      task.completed 
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" 
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <ArrowRight size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${task.completed ? "text-gray-500 dark:text-gray-400 line-through" : ""}`}>
                      {task.title}
                    </p>
                  </div>
                  {!task.completed && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-shiftly-blue"
                      onClick={() => onStartTask(task.id)}
                    >
                      Start
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
