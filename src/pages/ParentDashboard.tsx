
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  TrendingUp, 
  TrendingDown, 
  BookOpen, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  Bell,
  Target,
  Award,
  Clock
} from 'lucide-react';
import PerformanceChart from '@/components/PerformanceChart';
import HomeworkTracker from '@/components/HomeworkTracker';
import FeeManagement from '@/components/FeeManagement';
import AttendanceCalendar from '@/components/AttendanceCalendar';
import MessageCenter from '@/components/MessageCenter';

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState('emma');

  const children = [
    { id: 'emma', name: 'Emma Johnson', grade: 'Grade 8', class: '8-A' },
    { id: 'alex', name: 'Alex Johnson', grade: 'Grade 5', class: '5-B' }
  ];

  const currentChild = children.find(child => child.id === selectedChild);

  const recentPerformance = [
    { subject: 'Mathematics', score: 85, trend: 'up', change: '+12%' },
    { subject: 'English', score: 78, trend: 'down', change: '-5%' },
    { subject: 'Science', score: 92, trend: 'up', change: '+8%' },
    { subject: 'History', score: 81, trend: 'up', change: '+3%' }
  ];

  const upcomingEvents = [
    { date: '2024-01-15', event: 'Math Test', type: 'exam' },
    { date: '2024-01-18', event: 'Parent-Teacher Meeting', type: 'meeting' },
    { date: '2024-01-20', event: 'Science Fair', type: 'event' },
    { date: '2024-01-25', event: 'Fee Due Date', type: 'fee' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
              <div className="flex items-center gap-2">
                {children.map((child) => (
                  <Button
                    key={child.id}
                    variant={selectedChild === child.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedChild(child.id)}
                  >
                    {child.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
                <Badge className="ml-2">3</Badge>
              </Button>
              <div className="flex items-center gap-2">
                <User className="w-8 h-8 bg-gray-200 rounded-full p-2" />
                <span className="text-sm font-medium">Sarah Johnson</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Student Info */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{currentChild?.name}</h2>
                <p className="text-gray-600">{currentChild?.grade} • {currentChild?.class}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="secondary">Attendance: 96%</Badge>
                  <Badge variant="secondary">Overall Grade: A-</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85.2%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Homework</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                2 due today, 1 overdue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fee Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$450</div>
              <p className="text-xs text-muted-foreground">
                Due: Jan 25, 2024
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96%</div>
              <p className="text-xs text-muted-foreground">
                18/19 days this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="homework">Homework</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPerformance.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="font-medium">{subject.subject}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{subject.score}%</span>
                        {subject.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm ${subject.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {subject.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  AI Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Great Progress in Math!</p>
                      <p className="text-sm text-green-700">Emma's math performance has improved by 12% this month. Keep up the excellent work!</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">English Needs Attention</p>
                      <p className="text-sm text-yellow-700">Recent English scores show a slight decline. Consider additional reading practice or tutoring support.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homework">
            <HomeworkTracker />
          </TabsContent>

          <TabsContent value="fees">
            <FeeManagement />
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceCalendar />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-gray-600">{event.date}</p>
                      </div>
                      <Badge variant={event.type === 'exam' ? 'destructive' : 'secondary'}>
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <MessageCenter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParentDashboard;
