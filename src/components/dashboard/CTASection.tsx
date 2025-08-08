import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

const CTASection = () => {
  return (
    <div className="text-center">
      <div className="role-manager">
        <Card
          className="text-white border-0 shadow-xl rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--chart-2)))",
          }}
        >
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of teams already using our platform to streamline
              their workflow and boost productivity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-semibold bg-white text-primary hover:bg-gray-100"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-semibold bg-white text-primary hover:bg-gray-100"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CTASection;
