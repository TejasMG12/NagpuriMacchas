import React from "react";
import Layout from "../components/Layout";
import HealthCard from "@/components/Dashpoard/Health_card";
import { HeartPulse, Droplets, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // ShadCN Card
import HealthSuggestions from "@/components/Dashpoard/HealthSuggestions";
import { useRouter } from "next/router";
import { Button } from "@/components/button";
import Image from "next/image";

const Home: React.FC = () => {
    // Sample data for charts
    const sugarData = [{ value: 75 }, { value: 80 }, { value: 85 }, { value: 82 }, { value: 80 }];
    const heartData = [{ value: 90 }, { value: 95 }, { value: 100 }, { value: 98 }, { value: 97 }];
    const pressureData = [{ value: 100 }, { value: 105 }, { value: 102 }, { value: 101 }, { value: 102 }];

    // Card container styles
    
    const suggestionsStyle: React.CSSProperties = {
        width: "98%", // Ensure it takes full width
        backgroundColor: "#FFFFFF", // White background
        borderRadius: "16px", // Rounded corners
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Floating effect
        padding: "15px",
        marginBottom: "24px",
        marginLeft:"17px"
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
            <div style={{ display: "flex", gap: "140px", padding: "20px" }}>
                {/* Left Section (2/3 width) */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                    
                    {/* Left-Top Section */}
                    <div style={{ display: "flex", gap: "15px", justifyContent: "center", padding: "20px", }}>
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
                <div style={sectionContainerStyle}>
      <Card style={sectionStyle}>
        <CardContent>
          {/* Poster Image */}
          <div style={{ textAlign: "center" }}>
            <Image src="/poster.png" alt="Health Check Poster" width={400} height={400} />
          </div>

          
          {/* Information Boxes */}
          <div style={infoBoxContainer}>
            <div style={{ ...infoBoxStyle, backgroundColor: "#A7E0A1" }}>
              💡 Get possible causes, natural remedies instantly.
            </div>
            <div style={{ ...infoBoxStyle, backgroundColor: "#A9D5F9" }}>
              🔍 If necessary, find the right doctor for expert help.
            </div>
            <div style={{ ...infoBoxStyle, backgroundColor: "#FEE8A1" }}>
              ✍ Start by describing how you feel. Your health journey begins here!
            </div>
          </div>

          {/* Start Button */}
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <Button style={startButtonStyle} onClick={initializeChat}>
              Start Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
            </div>
        </Layout>
    );
};

export default Home;



const sectionContainerStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // padding: "40px",
  };
  
  const sectionStyle: React.CSSProperties = {
    backgroundColor: "#D2E2FB", // Light Blue Background
    borderRadius: "20px",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
    padding: "40px",
    textAlign: "center",
    maxWidth: "500px",
    height: "800px", // Doubled height
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around", // Balanced spacing
    marginTop:"15px",
    marginLeft:"10px"
  };
  
  
  const infoBoxContainer: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };
  
  const infoBoxStyle: React.CSSProperties = {
    padding: "18px",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "500",
    textAlign: "center",
  };
  
  const startButtonStyle: React.CSSProperties = {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "18px 28px",
    borderRadius: "12px",
    fontSize: "20px",
    fontWeight: "bold",
  };
  