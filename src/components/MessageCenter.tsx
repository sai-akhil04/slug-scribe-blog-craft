
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, User, Bell, Calendar } from 'lucide-react';

const MessageCenter = () => {
  const [newMessage, setNewMessage] = useState('');
  
  const messages = [
    {
      id: 1,
      from: 'Mrs. Sarah Wilson',
      role: 'Math Teacher',
      subject: 'Emma\'s Math Progress',
      message: 'Emma has shown excellent improvement in algebra. Her recent test score of 88% reflects her hard work. Keep encouraging her practice with word problems.',
      date: '2024-01-14',
      time: '2:30 PM',
      status: 'unread'
    },
    {
      id: 2,
      from: 'Mr. David Chen',
      role: 'Class Teacher',
      subject: 'Parent-Teacher Meeting',
      message: 'Reminder: Parent-Teacher meeting is scheduled for January 18th at 3:00 PM. Please confirm your attendance.',
      date: '2024-01-13',
      time: '10:15 AM',
      status: 'read'
    },
    {
      id: 3,
      from: 'School Administration',
      role: 'Admin',
      subject: 'Science Fair Participation',
      message: 'Emma has been selected to participate in the upcoming Science Fair. Please submit the consent form by January 20th.',
      date: '2024-01-12',
      time: '9:00 AM',
      status: 'read'
    }
  ];

  const announcements = [
    {
      title: 'Winter Break Holiday',
      message: 'School will be closed from January 22-26 for winter break.',
      date: '2024-01-10',
      priority: 'info'
    },
    {
      title: 'Fee Payment Reminder',
      message: 'January fee payment is due by January 25th. Late fees will apply after the due date.',
      date: '2024-01-08',
      priority: 'urgent'
    },
    {
      title: 'Sports Day Registration',
      message: 'Registration for Annual Sports Day is now open. Please register by January 30th.',
      date: '2024-01-05',
      priority: 'normal'
    }
  ];

  const quickActions = [
    { title: 'Request Meeting', icon: Calendar },
    { title: 'Report Issue', icon: Bell },
    { title: 'General Inquiry', icon: MessageSquare }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Button key={index} variant="outline" className="h-16 flex flex-col gap-2">
                <action.icon className="w-5 h-5" />
                {action.title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Messages from Teachers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Messages from Teachers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`border rounded-lg p-4 ${message.status === 'unread' ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{message.from}</p>
                      <p className="text-sm text-gray-600">{message.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{message.date}</p>
                    <p className="text-xs text-gray-500">{message.time}</p>
                    {message.status === 'unread' && (
                      <Badge className="mt-1">New</Badge>
                    )}
                  </div>
                </div>
                
                <h3 className="font-medium mb-2">{message.subject}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{message.message}</p>
                
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">Reply</Button>
                  <Button size="sm" variant="ghost">Mark as Read</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Send New Message */}
      <Card>
        <CardHeader>
          <CardTitle>Send Message to Teacher</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Subject</label>
            <Input placeholder="Enter message subject" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <Textarea 
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={4}
            />
          </div>
          <Button className="w-full sm:w-auto">
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </CardContent>
      </Card>

      {/* School Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            School Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {announcements.map((announcement, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{announcement.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      announcement.priority === 'urgent' ? 'destructive' : 
                      announcement.priority === 'info' ? 'secondary' : 'default'
                    }>
                      {announcement.priority}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2">{announcement.message}</p>
                <p className="text-xs text-gray-500">{announcement.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageCenter;
