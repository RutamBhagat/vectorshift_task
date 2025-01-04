import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";

export function ValidationStatus({ title, isValid }) {
  return (
    <Card
      className={cn(
        "bg-white border",
        isValid ? "border-green-200" : "border-red-200",
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isValid ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <span className="font-medium text-gray-900">{title}</span>
          </div>
          <span
            className={cn(
              "text-sm font-medium px-2 py-1 rounded-full",
              isValid
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800",
            )}
          >
            {isValid ? "Valid" : "Invalid"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
