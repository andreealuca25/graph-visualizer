import { useEffect, useRef } from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  items: { label: string; onClick: () => void }[];
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <ul
      className="absolute bg-white border border-gray-300 shadow-lg list-none p-0 m-0 z-50"
      style={{ top: y, left: x }}
      ref={menuRef}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            item.onClick();
            onClose();
          }}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
