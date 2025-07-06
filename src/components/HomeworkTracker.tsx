
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertTriangle, Upload } from 'lucide-react';

const HomeworkTracker = () => {
  const homeworkData = [
    {
      subject: 'Mathematics',
      title: 'Chapter 12 Exercises',
      dueDate: '2024-01-15',
      status: 'pending',
      description: 'Complete exercises 1-20 from Chapter 12: Algebra',
      priority: 'high'
    },
    {
      subject: 'English',
      title: 'Essay: My Future Goals',
      dueDate: '2024-01-16',
      status: 'submitted',
      description: 'Write a 500-word essay about your future career goals',
      priority: 'medium'
    },
    {
      subject: 'Science',
      title: 'Lab Report: Chemical Reactions',
      dueDate: '2024-01-18',
      status: 'pending',
      description: 'Complete lab report based on yesterday\'s experiment',
      priority: 'medium'
    },
    {
      subject: 'History',
      title: 'Research Project',
      dueDate: '2024-01-12',
      status: 'overdue',
      description: 'Research on World War II impacts',
      priority: 'high'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'overdue':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-gray-600">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Homework List */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Homework & Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {homeworkData.map((hw, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(hw.status)}
                    <div>
                      <h3 className="font-semibold">{hw.title}</h3>
                      <p className="text-sm text-gray-600">{hw.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(hw.status)}>
                      {hw.status}
                    </Badge>
                    {hw.priority === 'high' && (
                      <Badge variant="destructive">High Priority</Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{hw.description}</p>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Due: {hw.dueDate}</p>
                  {hw.status === 'pending' && (
                    <Button size="sm" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Work
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Homework Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>This Week</span>
              <span>75% Complete</span>
            </div>
            <Progress value={75} />
            <p className="text-xs text-gray-600">
              3 out of 4 assignments completed this week
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeworkTracker;
