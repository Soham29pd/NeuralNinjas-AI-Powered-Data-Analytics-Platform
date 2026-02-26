export const mockDashboardData = {
    stats: [
        { title: "Total Reach", value: "2.4M", trend: "+12.5%", isPositive: true, icon: "Users" },
        { title: "Avg. Engagement", value: "4.8%", trend: "+0.5%", isPositive: true, icon: "Activity" },
        { title: "Follower Growth", value: "125.4k", trend: "+8.2%", isPositive: true, icon: "TrendingUp" },
        { title: "Top Format", value: "Reels", trend: "Stable", isPositive: true, icon: "Video" }
    ],
    engagementHistory: [
        { date: 'Jan 1', engagement: 4000, reach: 2400 },
        { date: 'Jan 8', engagement: 3000, reach: 1398 },
        { date: 'Jan 15', engagement: 2000, reach: 9800 },
        { date: 'Jan 22', engagement: 2780, reach: 3908 },
        { date: 'Jan 29', engagement: 1890, reach: 4800 },
        { date: 'Feb 5', engagement: 2390, reach: 3800 },
        { date: 'Feb 12', engagement: 3490, reach: 4300 },
    ],
    postPerformance: [
        { name: 'Reels', value: 65, fill: '#8884d8' },
        { name: 'Images', value: 25, fill: '#82ca9d' },
        { name: 'Videos', value: 10, fill: '#ffc658' }
    ],
    bestTimes: {
        day: "Friday",
        time: "7:00 PM",
        heatmap: Array.from({ length: 7 * 6 }, (_, i) => ({
            day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][Math.floor(i / 6)],
            hour: 12 + (i % 6) + " PM", // Simplified for demo
            value: Math.floor(Math.random() * 100)
        }))
    },
    topPosts: [
        { id: 1, title: "Summer Vibes Reel", type: "Reel", date: "2024-02-10", views: "1.2M", likes: "45K", engagement: "5.2%" },
        { id: 2, title: "Product Launch", type: "Image", date: "2024-02-08", views: "450K", likes: "12K", engagement: "3.8%" },
        { id: 3, title: "Tutorial Video", type: "Video", date: "2024-02-05", views: "890K", likes: "28K", engagement: "4.5%" },
        { id: 4, title: "Behind Scenes", type: "Reel", date: "2024-02-01", views: "670K", likes: "32K", engagement: "6.1%" },
    ],
    alerts: [
        { type: "warning", message: "Engagement drop detected on recent image posts." },
        { type: "success", message: "Reels are performing 20% better than last week." }
    ]
};
