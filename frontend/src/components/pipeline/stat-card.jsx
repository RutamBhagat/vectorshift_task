import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function StatCard({ title, value, icon: Icon }) {
  return (
    <Card className="bg-white border-indigo-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-indigo-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  );
}
