import React, { useState, MouseEvent, WheelEvent, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";

interface Position {
  x: number;
  y: number;
}

const BoardFigma: React.FC = () => {
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [isDraggingItem, setIsDraggingItem] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  console.log(isDraggingItem);
  const [, drop] = useDrop({
    accept: ["ELEMENT_1", "ELEMENT_2", "ARROW"],
    drop: (item, monitor) => {
      const initialOffset = monitor.getInitialClientOffset();
      const initialSourceOffset = monitor.getInitialSourceClientOffset();

      const dropResult = monitor.getClientOffset();

      if (dropResult && initialOffset && initialSourceOffset) {
        const dx = initialOffset.x - initialSourceOffset.x;
        const dy = initialOffset.y - initialSourceOffset.y;

        setPosition({
          x: (dropResult.x - dx) / scale, // accounting for the scale here
          y: (dropResult.y - dy) / scale, // and here
        });
        console.log(
          "drop",
          (dropResult.x - dx) / scale,
          (dropResult.y - dy) / scale,
        );
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const DraggableElement: React.FC = () => {
    const [{ isDraggingThisItem }, drag] = useDrag({
      type: "ELEMENT_1",
      item: { id: "ELEMENT_1" },

      end: (item, monitor) => {
        const dropResult = monitor.getClientOffset();
        console.log("merde", dropResult?.x, dropResult?.y);
        if (dropResult) {
          setPosition({ x: dropResult.x, y: dropResult.y });
        }
      },
      collect: (monitor) => ({
        isDraggingThisItem: !!monitor.isDragging(),
      }),
    });

    useEffect(() => {
      if (isDraggingItem !== isDraggingThisItem)
        setIsDraggingItem(isDraggingThisItem);
      // Assuming setIsDraggingItem updates some state or does something relevant.
    }, [isDraggingThisItem]);

    return (
      <div
        ref={drag}
        style={{
          position: "absolute",
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: "100px",
          height: "100px",
          backgroundColor: "blue",
          cursor: "move",
        }}
      >
        Drag me
      </div>
    );
  };

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setLastPosition(null);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !lastPosition || isDraggingItem) return;

    const dx = e.clientX - lastPosition.x;
    const dy = e.clientY - lastPosition.y;

    setOffset((prev) => ({
      x: Math.min(Math.max(prev.x + dx, -500), 500), // Arbitrary bounds for x axis
      y: Math.min(Math.max(prev.y + dy, -500), 500), // Arbitrary bounds for y axis
    }));

    setLastPosition({ x: e.clientX, y: e.clientY });
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    const newScale =
      e.deltaY > 0 ? Math.max(0.1, scale - 0.1) : Math.min(2, scale + 0.1); // scale is bound between 0.1 and 2

    setScale(newScale);
  };

  return (
    <div
      ref={drop}
      className="relative w-[80%] overflow-hidden bg-slate-100"
      // onMouseDown={handleMouseDown}
      // onMouseUp={handleMouseUp}
      // onMouseLeave={handleMouseUp}
      // onMouseMove={handleMouseMove}
      onWheel={handleWheel}
    >
      <div
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          // transformOrigin: "top left",
          position: "absolute",
          width: "200%", // Adjust this value as per your needs
          height: "200%", // Adjust this value as per your needs
        }}
      >
        <DraggableElement />
        {/* Other board content */}
      </div>
    </div>
  );
};

export default BoardFigma;
