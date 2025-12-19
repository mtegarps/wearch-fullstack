export interface GalleryItem {
  url: string;
  title: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  location: string;
  year: string;
  image: string;
  category: string;
  gallery: GalleryItem[];
  area: string;
  duration: string;
  client: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  specialty: string;
}

export interface Service {
  title: string;
  desc: string;
  services: string[];
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  desc: string;
  metric: string;
}

export interface CoreValue {
  label: string;
  icon: string;
  desc: string;
}

export interface ContactItem {
  label: string;
  value: string;
  href: string;
  icon: string;
}
