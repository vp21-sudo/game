"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragContainerRef = useRef<HTMLDivElement>(null);
  const [dragTimeout, setDragTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState(true);

  useEffect(() => {
    return () => {
      if (dragTimeout) {
        clearTimeout(dragTimeout);
      }
    };
  }, [dragTimeout]);

  const handleDragStart = () => {
    setIsDragging(true);
    setDragTimeout(setTimeout(handleDragTimeout, 20000)); // Set timeout for 2 seconds
  };

  const handleDragEnd = () => {
    console.log("drag ended")
    setIsDragging(true);
    if (dragTimeout) {
      clearTimeout(dragTimeout); // Clear the timeout if drag ends before timeout
    }
  };

  const handleDragTimeout = () => {
    setIsDragging(false);
    // Perform actions when the drag timeout occurs (after 2 seconds)
    console.log('Drag timeout reached');
  };

  const applyRandomVelocity = (obj: any) =>  {
    const maxVelocity = 100; // Adjust as needed
    const velocityX = (Math.random() - 0.5) * 2 * maxVelocity; 
    const velocityY = (Math.random() - 0.5) * 2 * maxVelocity;  
  
    obj.velocity = { x: velocityX, y: velocityY }; // Store for other potential uses
  }

  return (
    <div ref={containerRef} className='overflow-hidden w-screen h-screen bg-slate-400 flex justify-center items-end'>
      <div className=' absolute left-0 bg-red-500 h-2 w-screen' style={{bottom: "200px"}}>

      </div>
      <motion.div
      ref={dragContainerRef}
        className='  w-24 h-24 bg-slate-50 rounded-full'
        // style={{ maxWidth: '100vw' }}
        whileHover={{ scale: 1.2 }}
        drag={isDragging}
        dragElastic={Math.random()}
        dragConstraints={containerRef}
        onDragStart={(event, info) => {
          handleDragStart();
          applyRandomVelocity(info); // Apply a random velocity on drag start
      }}
      onDrag={(event,info) => {
        let maxDrag = 510
        if(containerRef.current){
          maxDrag = containerRef.current.getBoundingClientRect().height - 200
        }
        console.log(info.point.y)
        console.log(maxDrag)
        if(info.point.y < maxDrag){
          handleDragTimeout()
        }
      }}
        onDragEnd={handleDragEnd}
      ></motion.div>
    </div>
  );
};

export default Page;
