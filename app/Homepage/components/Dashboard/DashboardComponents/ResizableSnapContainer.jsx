import { Button } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";

import { FiUnlock } from "react-icons/fi";
import { FiLock } from "react-icons/fi";

const ResizableSnapContainer = ({
  parentForResizable,
  mouseIsUp,
  content,
  divId,
}) => {
  const resizingContainer = useRef(null);
  const [width, setWidth] = useState(0);

  const [lockGraph, setLockGraph] = useState(false);
  const [mouseUpSetWidth, setMouseUpSetWidth] = useState("");

  useEffect(() => {
    const divElement = resizingContainer.current;

    if (!divElement) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(divElement);

    return () => {
      observer.unobserve(divElement);
    };
  }, [resizingContainer]);

  useEffect(() => {
    if (mouseIsUp) {
      if (lockGraph) {
        if (width >= parentForResizable * 0.75) {
          setMouseUpSetWidth("transition-all !w-[calc(100%)]");
        } else {
          setMouseUpSetWidth("transition-all !w-[calc(50%-8px)]");
        }
      }

      // else {
      //   setMouseUpSetWidth("transition-all !w-[calc(50%-8px)]");
      // }
    }
  }, [mouseIsUp]);

  const handleLock = () => {
    setLockGraph((prev) => !prev);

    if (!lockGraph) {
      if (width === parentForResizable - 8) {
        setMouseUpSetWidth("!w-[calc(100%)]");
        console.log("full");
      } else {
        setMouseUpSetWidth("!w-[calc(50%-8px)]");
        console.log("half");
      }
    }
  };

  const handleMouseDown = () => {
    if (lockGraph) {
      setMouseUpSetWidth("");
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-a-white min-h-[calc(60vh-144px)] max-h-[calc(60vh-144px)] rounded-md black overflow-auto min-w-[100%] w-[100%] sm:min-w-[calc(50%-8px)] sm:w-[calc(50%-8px)] ${mouseUpSetWidth} flex ${
        !lockGraph ? "flex-1 resize-none" : "resize-x"
      }`}
      onMouseDown={handleMouseDown}
      id={divId}
      ref={resizingContainer}
    >
      <div className="absolute right-12 z-[20]">
        <Button
          isIconOnly
          variant="light"
          className="m-2"
          onPress={() => (setMouseUpSetWidth(""), handleLock())}
        >
          {lockGraph ? <FiUnlock /> : <FiLock />}
        </Button>
      </div>
      {content}
    </div>
  );
};

export default ResizableSnapContainer;
