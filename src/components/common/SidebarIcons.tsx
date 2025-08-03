// components/icons.ts
import {
  Home,
  Users,
  BarChart,
  Settings,
  Dumbbell,
  CalendarDays,
} from "lucide-react";
import {
  Calendar,
  CreditCard,
  Receipt,
  Trophy,
  User,
  Search,
  Bell,
  ChevronRight,
  Activity,
  Target,
  Flame,
  Zap,
  Apple,
  Drumstick,
} from "lucide-react";
import { FaRunning } from "react-icons/fa";
import { FaBreadSlice, FaUserTie } from "react-icons/fa6";
import { TbYoga } from "react-icons/tb";

export const icons = {
  Home: Home,
  Classes: CalendarDays,
  Users: Users,
  BarChart: BarChart,
  Settings: Settings,
  Dumbbell: Dumbbell,
  Equipment: Dumbbell,
};

export const memberIcons = {
  // Navigation icons
  home: Home,
  calendar: Calendar,
  dumbbell: Dumbbell,
  "users-class": Users,
  "user-tie": FaUserTie,
  "credit-card": CreditCard,
  receipt: Receipt,
  trophy: Trophy,
  user: User,
  settings: Settings,
  search: Search,
  bell: Bell,
  chevron: ChevronRight,

  // Feature icons
  activity: Activity,
  target: Target,
  flame: Flame,
  zap: Zap,
  "apple-alt": Apple,
  "drumstick-bite": Drumstick,
  "bread-slice": FaBreadSlice,
  running: FaRunning,
  yoga: TbYoga,
} as const;

export type IconName = keyof typeof memberIcons;
