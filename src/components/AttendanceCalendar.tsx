
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const AttendanceCalendar = () => {
  const attendanceData = {
    totalDays: 19,
    presentDays: 18,
    absentDays: 1,
    lateArrivals: 2,
    percentage: 94.7
  };

  const monthlyAttendance = [
    { date: '2024-01-01', status: 'present' },
    { date: '2024-01-02', status: 'present' },
    { date: '2024-01-03', status: 'present' },
    { date: '2024-01-04', status: 'absent' },
    { date: '2024-01-05', status: 'present' },
    { date: '2024-01-08', status: 'late' },
    { date: '2024-01-09', status: 'present' },
    { date: '2024-01-10', status: 'present' },
    { date: '2024-01-11', status: 'present' },
    { date: '2024-01-12', status: 'present' },
    { date: '2024-01-15', status: 'present' },
    { date: '2024-01-16', status: 'late' },
    { date: '2024-01-17', status: 'present' },
    { date: '2024-01-18', status: 'present' },
    { date: '2024-01-19', status: 'present' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'late':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Attendance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{attendanceData.presentDays}</p>
                <p className="text-sm text-gray-600">Present Days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{attendanceData.absentDays}</p>
                <p className="text-sm text-gray-600">Absent Days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{attendanceData.lateArrivals}</p>
                <p className="text-sm text-gray-600">Late Arrivals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{attendanceData.percentage}%</p>
                <p className="text-sm text-gray-600">Attendance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Attendance Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>January 2024</span>
                <span>{attendanceData.percentage}%</span>
              </div>
              <Progress value={attendanceData.percentage} className="h-3" />
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Excellent attendance!</strong> Emma has attended {attendanceData.presentDays} out of {attendanceData.totalDays} school days this month.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Attendance Record */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Attendance Record</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {monthlyAttendance.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(day.status)}
                  <span className="font-medium">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <Badge className={getStatusColor(day.status)}>
                  {day.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Great Attendance Record</span>
            </div>
            <p className="text-sm text-green-700">
              Emma maintains excellent attendance with 94.7% presence rate this month.
            </p>
          </div>
          
          {attendanceData.absentDays > 0 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Recent Absence</span>
              </div>
              <p className="text-sm text-yellow-700">
                Emma was absent on January 4th. Please ensure medical certificates are submitted for extended absences.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceCalendar;
