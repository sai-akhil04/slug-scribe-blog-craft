
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, CreditCard, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

const FeeManagement = () => {
  const feeStructure = {
    totalFee: 2500,
    paidAmount: 2050,
    balanceAmount: 450,
    dueDate: '2024-01-25',
    lastPayment: {
      amount: 800,
      date: '2023-12-15',
      method: 'Online Payment'
    }
  };

  const paymentHistory = [
    { date: '2023-12-15', amount: 800, description: 'Monthly Fee - December', status: 'paid' },
    { date: '2023-11-15', amount: 750, description: 'Monthly Fee - November', status: 'paid' },
    { date: '2023-10-15', amount: 500, description: 'Activity Fee', status: 'paid' },
    { date: '2024-01-25', amount: 450, description: 'Monthly Fee - January', status: 'pending' }
  ];

  const feeBreakdown = [
    { category: 'Tuition Fee', amount: 1800, status: 'paid' },
    { category: 'Activity Fee', amount: 300, status: 'paid' },
    { category: 'Library Fee', amount: 100, status: 'paid' },
    { category: 'Lab Fee', amount: 150, status: 'pending' },
    { category: 'Transport Fee', amount: 150, status: 'pending' }
  ];

  const completionPercentage = (feeStructure.paidAmount / feeStructure.totalFee) * 100;

  return (
    <div className="space-y-6">
      {/* Fee Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fee</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${feeStructure.totalFee}</div>
            <p className="text-xs text-muted-foreground">Academic Year 2023-24</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${feeStructure.paidAmount}</div>
            <p className="text-xs text-muted-foreground">
              {completionPercentage.toFixed(1)}% Complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance Due</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${feeStructure.balanceAmount}</div>
            <p className="text-xs text-muted-foreground">Due: {feeStructure.dueDate}</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Fee Payment Progress</span>
              <span>{completionPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </div>
          
          {feeStructure.balanceAmount > 0 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Payment Due</span>
              </div>
              <p className="text-sm text-yellow-700 mb-3">
                ${feeStructure.balanceAmount} is due by {feeStructure.dueDate}
              </p>
              <Button className="w-full sm:w-auto">
                Pay Now - ${feeStructure.balanceAmount}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fee Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {feeBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <span className="font-medium">{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">${item.amount}</span>
                  <Badge variant={item.status === 'paid' ? 'secondary' : 'destructive'}>
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{payment.description}</p>
                  <p className="text-sm text-gray-600">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${payment.amount}</p>
                  <Badge variant={payment.status === 'paid' ? 'secondary' : 'destructive'}>
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeeManagement;
