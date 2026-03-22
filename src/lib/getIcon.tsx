import {
  Briefcase,
  Database,
  Code2,
  TerminalSquare,
  Cloud,
  Globe,
  LayoutTemplate,
  Braces,
  Server,
  Plug,
  Layers,
  ShoppingCart,
} from 'lucide-react';
import { SiReact } from 'react-icons/si';

// Logo oficial do React (átomo com 3 órbitas elípticas interconectadas)
function ReactLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return <SiReact className={`${className} fill-current`} />;
}

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase,
  Database,
  Code2,
  TerminalSquare,
  Cloud,
  Globe,
  LayoutTemplate,
  Braces,
  Server,
  Plug,
  Layers,
  ShoppingCart,
  ReactLogo,
};

export function getIcon(iconName: string, className = 'w-4 h-4'): React.ReactNode {
  const IconComponent = icons[iconName] || Briefcase;
  return <IconComponent className={className} />;
}
