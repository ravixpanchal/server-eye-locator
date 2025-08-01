export const mockServers = [
  {
    id: '1',
    name: 'US-East-1',
    ip: '54.123.45.67',
    location: 'Virginia, USA',
    coordinates: [-77.0369, 38.9072] as [number, number],
    status: 'online' as const,
    uptime: '99.9%',
    responseTime: 45,
    lastChecked: '2 min ago'
  },
  {
    id: '2',
    name: 'EU-West-1',
    ip: '52.198.76.43',
    location: 'London, UK',
    coordinates: [-0.1276, 51.5074] as [number, number],
    status: 'online' as const,
    uptime: '99.8%',
    responseTime: 32,
    lastChecked: '1 min ago'
  },
  {
    id: '3',
    name: 'AP-South-1',
    ip: '13.234.567.89',
    location: 'Mumbai, India',
    coordinates: [72.8777, 19.0760] as [number, number],
    status: 'warning' as const,
    uptime: '97.2%',
    responseTime: 156,
    lastChecked: '30 sec ago'
  },
  {
    id: '4',
    name: 'US-West-2',
    ip: '34.245.123.98',
    location: 'Oregon, USA',
    coordinates: [-120.5542, 43.8041] as [number, number],
    status: 'offline' as const,
    uptime: '94.1%',
    responseTime: 0,
    lastChecked: '5 min ago'
  },
  {
    id: '5',
    name: 'AP-East-1',
    ip: '18.162.45.123',
    location: 'Tokyo, Japan',
    coordinates: [139.6503, 35.6762] as [number, number],
    status: 'online' as const,
    uptime: '99.7%',
    responseTime: 28,
    lastChecked: '1 min ago'
  },
  {
    id: '6',
    name: 'EU-Central-1',
    ip: '52.57.234.167',
    location: 'Frankfurt, Germany',
    coordinates: [8.6821, 50.1109] as [number, number],
    status: 'online' as const,
    uptime: '99.6%',
    responseTime: 41,
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
    server: 'US-West-2',
    message: 'Server is offline - Connection timeout',
    timestamp: '2024-01-20 14:32:15',
    ip: '34.245.123.98',
    location: 'Oregon, USA'
  },
  {
    id: '2',
    type: 'warning',
    server: 'AP-South-1',
    message: 'High response time detected (>150ms)',
    timestamp: '2024-01-20 14:28:42',
    ip: '13.234.567.89',
    location: 'Mumbai, India'
  },
  {
    id: '3',
    type: 'info',
    server: 'EU-West-1',
    message: 'Server back online after maintenance',
    timestamp: '2024-01-20 13:45:12',
    ip: '52.198.76.43',
    location: 'London, UK'
  }
];

export const statsData = {
  totalServers: 6,
  onlineServers: 4,
  avgResponseTime: 48,
  totalUptime: 98.7,
  totalAlerts: 12,
  criticalAlerts: 1
};