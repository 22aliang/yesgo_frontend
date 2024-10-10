import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

// Sample data (replace with actual data from your backend)
const postsData = {
  labels: ['Published Posts', 'Draft Posts'],
  datasets: [
    {
      label: 'Number of Posts',
      data: [12, 5], // Example: 12 published posts, 5 drafts
      backgroundColor: ['#4CAF50', '#FFC107'],
    },
  ],
};

const friendsData = {
  labels: ['Friends', 'Blocked'],
  datasets: [
    {
      label: 'Friends Status',
      data: [8, 2], // Example: 8 friends, 2 blocked
      backgroundColor: ['#2196F3', '#F44336'],
    },
  ],
};

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">儀表板</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar chart for posts */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4">發表的提案統計</h3>
          <Bar data={postsData} />
        </div>

        {/* Pie chart for friends */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4">好友統計</h3>
          <Pie data={friendsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
