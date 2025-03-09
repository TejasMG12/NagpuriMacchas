import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // Import ShadCN UI components
import HealthChart from "@/components/Dashpoard/HealthChart"; // Import chart component

interface HealthCardProps {
  title: string;
  value: string;
  unit: string;
  status: string;
  color: string;
  icon: React.ReactNode;
  data: { value: number }[];
}

const HealthCard: React.FC<HealthCardProps> = ({ title, value, unit, status, color, icon, data }) => {
  return (
    <Card
      style={{
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#1e1e1e",
        color: "white",
        width: "300px",
        padding: "20px",
      }}
    >
      <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        {/* Icon and Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ backgroundColor: color, padding: "10px", borderRadius: "8px" }}>{icon}</div>
          <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>{title}</h3>
        </div>

        {/* Value and Unit */}
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          {value} <span style={{ fontSize: "16px", color: "#aaa" }}>{unit}</span>
        </div>

        {/* Status Label */}
        <span
          style={{
            backgroundColor: color,
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {status}
        </span>

        {/* Chart */}
        <HealthChart data={data} color={color} />
      </CardContent>
    </Card>
  );
};

export default HealthCard;
