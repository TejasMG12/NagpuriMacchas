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

    const router = useRouter();

    const initializeChat = async (qtype: string) => {
      router.push(`/chatbox?qtype=${qtype}`);
    };

    return (
        <Layout>
            <div style={{ display: "flex", gap: "50px", padding: "10px" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", gap: "15px", justifyContent: "center", padding: "20px" }}>
                        <HealthCard title="Blood Sugar" value="80" unit="mg/dL" status="Normal" color="#F4A261" icon={<Droplets />} data={sugarData} />
                        <HealthCard title="Heart Rate" value="98" unit="bpm" status="Normal" color="#E76F51" icon={<HeartPulse />} data={heartData} />
                        <HealthCard title="Blood Pressure" value="102/72" unit="mmHg" status="Normal" color="#2A9D8F" icon={<Activity />} data={pressureData} />
                    </div>
                    <Card>
                        <HealthSuggestions />
                    </Card>
                </div>
                <div style={sectionContainerStyle}>
                    <Card style={sectionStyle}>
                        <CardContent>
                            <div style={{ textAlign: "center" }}>
                                <Image src="/poster.png" alt="Health Check Poster" width={400} height={400} />
                            </div>
                            <div style={infoBoxContainer}>
                                <Button style={{ ...infoBoxStyle, backgroundColor: "#A7E0A1" }} onClick={() => initializeChat("remedy")}>
                                    💡 Get possible causes, natural remedies instantly.
                                </Button>
                                <Button style={{ ...infoBoxStyle, backgroundColor: "#A9D5F9" }} onClick={() => initializeChat("doctor")}>
                                    🔍 If necessary, find the right doctor for expert help.
                                </Button>
                                <Button style={{ ...infoBoxStyle, backgroundColor: "#FEE8A1" }} onClick={() => initializeChat("describe")}>
                                    ✍ Start by describing how you feel. Your health journey begins here!
                                </Button>
                            </div>
                            <div style={{ textAlign: "center", marginTop: "15px" }}>
                                <Button style={startButtonStyle} onClick={() => initializeChat("default")}>
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
};

const sectionStyle: React.CSSProperties = {
    backgroundColor: "#D2E2FB",
    borderRadius: "20px",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
    padding: "40px",
    textAlign: "center",
    // maxWidth: "500px",
    width:"100%",
    height: "780px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: "15px",
    marginLeft: "10px"
};

const infoBoxContainer: React.CSSProperties = {
  marginTop:"40px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
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
