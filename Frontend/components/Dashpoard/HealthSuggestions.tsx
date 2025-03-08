import React from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/button";
import { ChevronDown } from "lucide-react";

const healthSuggestions = [
  { icon: "🍎", title: "Eat More Fruits", description: "Fruits provide essential vitamins and antioxidants for a healthier life." },
  { icon: "🥤", title: "Stay Hydrated", description: "Drink at least 2 liters of water daily to keep your body refreshed and energized." },
  { icon: "🏃", title: "Daily Jogging", description: "Jogging for 30 minutes boosts heart health, stamina, and mental clarity." },
  { icon: "☀️", title: "Get Sunlight Exposure", description: "Morning sunlight helps in vitamin D production and improves mood." },
  { icon: "🧘", title: "Practice Mindfulness", description: "10 minutes of meditation daily reduces stress and improves focus." },
];

const HealthSuggestions: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Daily Health Suggestions</h2>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" style={styles.dropdownButton}>
              Jan 2021 <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Jan 2021</DropdownMenuItem>
            <DropdownMenuItem>Feb 2021</DropdownMenuItem>
            <DropdownMenuItem>Mar 2021</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Suggestions List */}
      <div style={styles.suggestionsList}>
        {healthSuggestions.map((item, index) => (
          <div key={index} style={styles.suggestionItem}>
            <span style={styles.icon}>{item.icon}</span>
            <div>
              <h3 style={styles.suggestionTitle}>{item.title}</h3>
              <p style={styles.suggestionDescription}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthSuggestions;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%", // Full width
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
  },
  dropdownButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
  },
  suggestionsList: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  suggestionItem: {
    display: "flex",
    alignItems: "start",
    gap: "12px",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  icon: {
    fontSize: "24px",
  },
  suggestionTitle: {
    fontSize: "16px",
    fontWeight: "600",
  },
  suggestionDescription: {
    fontSize: "14px",
    color: "#555",
  },
};
