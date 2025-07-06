
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Users, BookOpen, Phone, Mail, MapPin } from 'lucide-react';

const Landing = () => {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">EduTrack360</h1>
                <p className="text-blue-600 font-medium">Smart Education Management System</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Excellence in Education</p>
              <p className="text-xs text-gray-500">Empowering Students, Engaging Parents</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* School Info Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">International Academy</span>
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            "Nurturing Excellence, Building Future Leaders"
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Stay connected with your child's academic journey through our comprehensive 
            parent engagement platform. Track performance, manage fees, and communicate 
            directly with teachers.
          </p>
        </div>

        {/* Branch Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Select Your Branch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your school branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="downtown">Downtown Campus</SelectItem>
                <SelectItem value="northside">Northside Branch</SelectItem>
                <SelectItem value="eastgate">Eastgate Campus</SelectItem>
                <SelectItem value="westfield">Westfield Branch</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Role Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Who are you?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant={selectedRole === 'parent' ? 'default' : 'outline'}
                className="h-20 flex flex-col gap-2"
                onClick={() => setSelectedRole('parent')}
              >
                <Users className="w-6 h-6" />
                Parent
              </Button>
              <Button
                variant={selectedRole === 'student' ? 'default' : 'outline'}
                className="h-20 flex flex-col gap-2"
                onClick={() => setSelectedRole('student')}
              >
                <GraduationCap className="w-6 h-6" />
                Student
              </Button>
              <Button
                variant={selectedRole === 'teacher' ? 'default' : 'outline'}
                className="h-20 flex flex-col gap-2"
                onClick={() => setSelectedRole('teacher')}
              >
                <BookOpen className="w-6 h-6" />
                Teacher
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        {selectedRole && selectedBranch && (
          <div className="text-center">
            <Link to={selectedRole === 'parent' ? '/parent-dashboard' : `/${selectedRole}-dashboard`}>
              <Button size="lg" className="px-8 py-3">
                Continue to Dashboard
              </Button>
            </Link>
          </div>
        )}

        {/* Contact Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@edutrack360.edu</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Support</h3>
              <p className="text-gray-600">24/7 Help Desk</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Landing;
