"use client"

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  triggerText: string;
  items: { href: string; label: string }[];
}

export default function Dropdown({ triggerText, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-transparent text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {triggerText}
          <ChevronDown className={`-mr-1 h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-188' : 'rotate-0'}`} aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-card shadow-lg ring-1 ring-border ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                role="menuitem"
                onClick={() => setIsOpen(false)} // Close on click
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
                                  }
      
