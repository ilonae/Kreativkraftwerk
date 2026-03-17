import React from 'react';
import { Project } from '../data/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  onClick: () => void;
}

export default function ProjectCard({ project: p, index: i, total, onClick }: ProjectCardProps) {
  return (
    <div
      className={`group cursor-pointer bg-white overflow-hidden
        ${i < total - 1 ? 'border-r border-gray-200' : ''}`}
      onClick={onClick}
    >
      {/* Image / gradient area */}
      <div
        className={`relative overflow-hidden ${p.imageUrl ? '' : `bg-gradient-to-br ${p.gradient}`}`}
        style={{ aspectRatio: '4/3' }}
      >
        {p.imageUrl ? (
          <img
            src={p.imageUrl}
            alt={p.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
        )}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-white text-xs tracking-label uppercase bg-black bg-opacity-60 px-2 py-1">
            View →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-4 border-t border-gray-100">
        {p.current && (
          <span className="block text-xs tracking-label uppercase text-kkw-pink font-semibold mb-1">
            Currently Showing
          </span>
        )}
        <h3 className="text-sm font-bold leading-tight mb-1 group-hover:text-kkw-pink transition-colors duration-200">
          {p.title}
        </h3>
        {p.subtitle && (
          <p className="text-xs text-gray-500 mb-0.5">{p.subtitle}</p>
        )}
        <p className="text-xs text-gray-400">{p.dates}</p>
        <p className="text-xs text-gray-400">{p.venue}, {p.city}</p>
      </div>
    </div>
  );
}
