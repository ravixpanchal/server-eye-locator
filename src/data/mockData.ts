export const mockServers = [
  {
    id: '1',
    name: 'Mumbai-Central-1',
    ip: '103.234.45.67',
    location: 'Mumbai, Maharashtra',
    coordinates: [72.8777, 19.0760] as [number, number],
    status: 'online' as const,
    uptime: '99.9%',
    responseTime: 45,
    lastChecked: '2 min ago'
  },
  {
    id: '2',
    name: 'Delhi-NCR-1',
    ip: '103.198.76.43',
    location: 'New Delhi, National Capital Territory',
    coordinates: [77.2090, 28.6139] as [number, number],
    status: 'online' as const,
    uptime: '99.8%',
    responseTime: 32,
    lastChecked: '1 min ago'
  },
  {
    id: '3',
    name: 'Bengaluru-Tech-1',
    ip: '103.134.567.89',
    location: 'Bengaluru, Karnataka',
    coordinates: [77.5946, 12.9716] as [number, number],
    status: 'warning' as const,
    uptime: '97.2%',
    responseTime: 156,
    lastChecked: '30 sec ago'
  },
  {
    id: '4',
    name: 'Chennai-Bay-1',
    ip: '103.245.123.98',
    location: 'Chennai, Tamil Nadu',
    coordinates: [80.2707, 13.0827] as [number, number],
    status: 'offline' as const,
    uptime: '94.1%',
    responseTime: 0,
    lastChecked: '5 min ago'
  },
  {
    id: '5',
    name: 'Kolkata-East-1',
    ip: '103.162.45.123',
    location: 'Kolkata, West Bengal',
    coordinates: [88.3639, 22.5726] as [number, number],
    status: 'online' as const,
    uptime: '99.7%',
    responseTime: 28,
    lastChecked: '1 min ago'
  },
  {
    id: '6',
    name: 'Hyderabad-Tech-1',
    ip: '103.57.234.167',
    location: 'Hyderabad, Telangana',
    coordinates: [78.4867, 17.3850] as [number, number],
    status: 'online' as const,
    uptime: '99.6%',
    responseTime: 41,
    lastChecked: '2 min ago'
  },
  {
    id: '7',
    name: 'Pune-West-1',
    ip: '103.87.156.234',
    location: 'Pune, Maharashtra',
    coordinates: [73.8567, 18.5204] as [number, number],
    status: 'online' as const,
    uptime: '99.4%',
    responseTime: 52,
    lastChecked: '3 min ago'
  },
  {
    id: '8',
    name: 'Ahmedabad-Guj-1',
    ip: '103.94.87.156',
    location: 'Ahmedabad, Gujarat',
    coordinates: [72.5714, 23.0225] as [number, number],
    status: 'online' as const,
    uptime: '99.2%',
    responseTime: 38,
    lastChecked: '1 min ago'
  },
  {
    id: '9',
    name: 'Kochi-South-1',
    ip: '103.175.89.234',
    location: 'Kochi, Kerala',
    coordinates: [76.2673, 9.9312] as [number, number],
    status: 'online' as const,
    uptime: '99.5%',
    responseTime: 47,
    lastChecked: '1 min ago'
  },
  {
    id: '10',
    name: 'Jaipur-Pink-1',
    ip: '103.123.78.145',
    location: 'Jaipur, Rajasthan',
    coordinates: [75.7873, 26.9124] as [number, number],
    status: 'online' as const,
    uptime: '99.3%',
    responseTime: 39,
    lastChecked: '2 min ago'
  }
];

export const performanceData = [
  { time: '00:00', responseTime: 45, uptime: 100 },
  { time: '04:00', responseTime: 52, uptime: 99.8 },
  { time: '08:00', responseTime: 38, uptime: 99.9 },
  { time: '12:00', responseTime: 61, uptime: 99.7 },
  { time: '16:00', responseTime: 44, uptime: 99.8 },
  { time: '20:00', responseTime: 39, uptime: 99.9 },
];

export const alertsData = [
  {
    id: '1',
    type: 'error',
    server: 'TN-Chennai-1',
    message: 'Server is offline - Connection timeout',
    timestamp: '2024-01-20 14:32:15',
    ip: '103.245.123.98',
    location: 'Chennai, Tamil Nadu'
  },
  {
    id: '2',
    type: 'warning',
    server: 'KA-Bangalore-1',
    message: 'High response time detected (>150ms)',
    timestamp: '2024-01-20 14:28:42',
    ip: '103.134.567.89',
    location: 'Bangalore, Karnataka'
  },
  {
    id: '3',
    type: 'info',
    server: 'MH-Mumbai-1',
    message: 'Server back online after maintenance',
    timestamp: '2024-01-20 13:45:12',
    ip: '103.234.45.67',
    location: 'Mumbai, Maharashtra'
  }
];

export const statsData = {
  totalServers: 8,
  onlineServers: 6,
  avgResponseTime: 42,
  totalUptime: 98.9,
  totalAlerts: 15,
  criticalAlerts: 1
};