"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const BoxesCore = ({ className, ...rest }) => {
  const rows = new Array(75).fill(1);
  const cols = new Array(30).fill(1);
  let colors = [
    "--gray-600", // Medium Gray
    "--gray-500", // Light Gray
    "--gray-400", // Lighter Gray
    "--gray-300", // Very Light Gray
    "--black",    // Black
    "--slate-600", // Medium Slate Gray
    "--slate-500", // Light Slate Gray
    "--green-800", // Darker Green
    "--green-700", // Medium Dark Green
    "--green-600", // Dark Green
    "--green-500", // Neon Green
    "--green-400", // Medium Green
    "--green-300", // Light Green
    "--green-200", // Very Light Green
];

  
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ",
        className
      )}
      {...rest}

      
    >
        
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-24 h-12  border-l  border-slate-700 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `var(${getRandomColor()})`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 6 },
              }}
              key={`col` + j}
              className="w-16 h-8  border-r border-t border-slate-700 relative"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
