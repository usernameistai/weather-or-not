import { useTheme } from '@/context/theme-provider';
import { Moon, Sun } from 'lucide-react';
// import React from 'react';
import { Link } from 'react-router-dom';
import CitySearch from './city-search';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <header 
        className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur 
        py-2 supports-[backdrop-filter]:bg-background/60'
      >
        <div className='container mx-auto flex h-16 items-center justify-between px-4'>
          <Link to={"/"}>
            <img src={isDark ? "./profilepic.png" : "./profilepic2.png"} 
              alt="weather-or-not Logo" 
                className={`h-16 rounded-tl-[33%] rounded-tr-[50%] rounded-br-[17%] rounded-bl-[50%] 
                shadow-lg ${isDark ? "shadow-yellow-200/30" : "shadow-gray-500/30"}`}
            />
          </Link>
            <div className='flex gap-4'>
              {/* Search */} 
              <CitySearch />
              {/* Theme Toggle */}
              <div onClick={() => setTheme(isDark ? "light" : "dark")}
                className={`flex items-center cursor-pointer transition-transform duration-500
                ${isDark ? 'rotate-180': 'rotate-360'} ml-2`}
              >
                {isDark
                  ? <Sun className='h-6 w-6 text-yellow-500 rotate-0 transition-all'/>
                  : <Moon className='h-6 w-6 text-blue-500 rotate-0 transition-all'/>
                }
              </div>
            </div>
        </div>
      </header>
    </>
  );
};

export default Header;