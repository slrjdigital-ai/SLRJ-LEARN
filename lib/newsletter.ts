import fs from 'fs';
import path from 'path';

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

interface SubscribersData {
  baseCount: number;
  subscribers: Subscriber[];
}

const DEFAULT_BASE_COUNT = 0;
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'subscribers.json');

// In-memory fallback if filesystem write is restricted in serverless environment
let inMemoryData: SubscribersData = {
  baseCount: DEFAULT_BASE_COUNT,
  subscribers: [],
};

function readData(): SubscribersData {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (typeof parsed.baseCount === 'number' && Array.isArray(parsed.subscribers)) {
        inMemoryData = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading subscribers.json, falling back to memory:', error);
  }
  return inMemoryData;
}

function writeData(data: SubscribersData): boolean {
  try {
    inMemoryData = data;
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing subscribers.json, persisting to memory:', error);
    return false;
  }
}

export function getSubscriberCount(): number {
  const data = readData();
  return (data.baseCount || DEFAULT_BASE_COUNT) + (data.subscribers?.length || 0);
}

export function addSubscriber(rawEmail: string): {
  count: number;
  isNew: boolean;
  subscriber: Subscriber;
} {
  const email = rawEmail.trim().toLowerCase();
  const data = readData();

  if (!Array.isArray(data.subscribers)) {
    data.subscribers = [];
  }

  const existing = data.subscribers.find((s) => s.email.toLowerCase() === email);
  if (existing) {
    return {
      count: (data.baseCount || DEFAULT_BASE_COUNT) + data.subscribers.length,
      isNew: false,
      subscriber: existing,
    };
  }

  const newSubscriber: Subscriber = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email,
    subscribedAt: new Date().toISOString(),
  };

  data.subscribers.unshift(newSubscriber);
  writeData(data);

  return {
    count: (data.baseCount || DEFAULT_BASE_COUNT) + data.subscribers.length,
    isNew: true,
    subscriber: newSubscriber,
  };
}
