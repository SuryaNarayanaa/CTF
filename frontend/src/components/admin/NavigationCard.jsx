import React from 'react';
import { Link } from 'react-router-dom';

const NavigationCard = ({ to, icon, label }) => (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-xl bg-gray-800/50 hover:bg-gray-800/70
                 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300
                 p-4 md:p-6 backdrop-blur-sm shadow-lg hover:shadow-emerald-500/10"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-transparent opacity-0
                     group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative flex items-center">
        {icon}
        <span className="ml-2 md:ml-4 font-['Press_Start_2P'] text-xs md:text-sm text-emerald-300 group-hover:text-emerald-200">
          {label}
        </span>
      </div>
    </Link>
  );


export default React.memo(NavigationCard);