import React from "react";
import Layout from "../components/Layout";
import HealthCard from "@/components/Dashpoard/Health_card";
import { HeartPulse, Droplets, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // ShadCN Card
import HealthSuggestions from "@/components/Dashpoard/HealthSuggestions";
import { useRouter } from "next/router";
import { Button } from "@/components/button";

const Home: React.FC = () => {
    // Sample data for charts
    const sugarData = [{ value: 75 }, { value: 80 }, { value: 85 }, { value: 82 }, { value: 80 }];
    const heartData = [{ value: 90 }, { value: 95 }, { value: 100 }, { value: 98 }, { value: 97 }];
    const pressureData = [{ value: 100 }, { value: 105 }, { value: 102 }, { value: 101 }, { value: 102 }];

    // Card container styles
    const sectionStyle: React.CSSProperties = {
        backgroundColor: "#FFFFFF", // Dark Gray Background
        borderRadius: "16px", // Rounded Corners
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Floating Effect
        padding: "15px",
        marginBottom: "24px",
    };
    const suggestionsStyle: React.CSSProperties = {
        width: "100%", // Ensure it takes full width
        backgroundColor: "#FFFFFF", // White background
        borderRadius: "16px", // Rounded corners
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Floating effect
        padding: "15px",
        marginBottom: "24px",
    };

    const router = useRouter();

  const initializeChat = async () => {
    try {
      const response = await fetch("http://localhost:5000/doctor/firsttime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "pk", qtype: "" }),
      });

      if (response.ok) {
        router.push("/chatbox"); // Redirects to Chat Page
      } else {
        console.error("Failed to initialize chat.");
      }
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  };

    return (
        <Layout>
            <div style={{ display: "flex", gap: "24px", padding: "24px" }}>
                {/* Left Section (2/3 width) */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                    
                    {/* Left-Top Section */}
                    <div style={{ display: "flex", gap: "20px", justifyContent: "center", padding: "20px" }}>
        <HealthCard title="Blood Sugar" value="80" unit="mg/dL" status="Normal" color="#F4A261" icon={<Droplets />} data={sugarData} />
        <HealthCard title="Heart Rate" value="98" unit="bpm" status="Normal" color="#E76F51" icon={<HeartPulse />} data={heartData} />
        <HealthCard title="Blood Pressure" value="102/72" unit="mmHg" status="Normal" color="#2A9D8F" icon={<Activity />} data={pressureData} />
                 </div>

                    {/* Left-Bottom Section */}
                    <Card style={suggestionsStyle}>
                        <HealthSuggestions/>
                    </Card>
                </div>

                {/* Right Section (1/3 width) */}
                <div style={{ flex: 1 }}>
                    <Card style={sectionStyle}>
                        <CardContent>
                        <Button  onClick={initializeChat}>
                          Start Chat
      </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
