// src/App.js
import React, { useState } from "react";
import _ from "lodash";
import { IoIosArrowDown } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

const dates = [
 "24-Apr-2024",
 "02-May-2024",
 "09-May-2024",
 "31-May-2024",
 "21-Jun-2024",
];
const views = ["Bullish", "Bearish", "RangeBound", "Volatile"];

const strategyData = [
 {
   View: "Bullish",
   Value: {
     "24-Apr-2024": [
       "Bull Call Spread",
       "Bull Put Spread",
       "Bull Put Spread",
       "Long Call",
       "Bull Put Spread",
       "Bull Call Spread",
       "Strategy1",
       "Bull Call Spread",
       "Strategy1",
       "Strategy1",
       "SpreadStrategy",
       "Bull Call Spread",
     ],
     "02-May-2024": [
       "Bull Call Spread",
       "Bull Call Spread",
       "Bull Put Spread",
       "Long Call",
       "Long Call",
       "Long Call",
       "Bull Put Spread",
       "Bull Call Spread",
       "Strategy1",
       "Bull Call Spread",
       "Strategy2",
       "Strategy1",
       "Strategy2",
       "Bull Call Spread",
     ],
     "09-May-2024": [
       "Strategy Put",
       "Strategy Call",
       "Strategy Call",
       "Strategy Call",
       "Strategy Put",
     ],
   },
 },
 {
   View: "Bearish",
   Value: {
     "24-Apr-2024": [
       "Bear Call Spread",
       "Bear Call Spread",
       "Bear Call Spread",
       "Long Put",
       "Long Put",
       "Long Put",
       "Bear Call Spread",
     ],
     "31-May-2024": [
       "Long Put",
       "Long Put",
       "Long Put",
       "Long Put",
       "Long Put",
     ],
     "21-Jun-2024": [
       "Strategy3",
       "Strategy3",
       "Bear Put Spread",
       "Strategy3",
       "Long Put",
       "Long Put",
     ],
   },
 },
 {
   View: "RangeBound",
   Value: {
     "24-Apr-2024": [
       "Short Straddle",
       "Short Strangle",
       "Short Strangle",
       "Iron Butterfly",
       "Short Strangle",
       "Short Straddle",
       "Strategy1",
       "Short Straddle",
       "Strategy1",
       "Strategy1",
       "SpreadStrategy",
       "Short Straddle",
     ],
     "02-May-2024": [
       "Short Straddle",
       "Short Straddle",
       "Short Strangle",
       "Iron Butterfly",
       "Iron Butterfly",
       "Iron Butterfly",
       "Short Strangle",
       "Short Straddle",
       "Strategy1",
       "Short Straddle",
       "Strategy2",
       "Strategy1",
       "Strategy2",
       "Short Straddle",
     ],
     "21-Jun-2024": [
       "Iron Condor",
       "Iron Butterfly",
       "Iron Butterfly",
       "Iron Butterfly",
       "Iron Condor",
     ],
   },
 },
 {
   View: "Volatile",
   Value: {
     "02-May-2024": [
       "Long Straddle",
       "Long Strangle",
       "Long Strangle",
       "Long Strangle",
       "Long Straddle",
       "Strategy1",
       "Long Straddle",
       "Strategy1",
       "Strategy1",
       "Spread-Strategy",
       "Long Straddle",
     ],
     "09-May-2024": [
       "Long Straddle",
       "Long Straddle",
       "Long Strangle",
       "Long Strangle",
       "Long Straddle",
       "Strategy1",
       "Long Straddle",
       "Strategy2",
       "Strategy1",
       "Strategy2",
       "Long Straddle",
     ],
     "31-May-2024": [
       "Long Straddle",
       "Long Strangle",
       "Long Strangle",
       "Long Strangle",
       "Long Straddle",
     ],
   },
 },
];

const App = () => {
 const [selectedView, setSelectedView] = useState("Bullish");
 const [selectedDate, setSelectedDate] = useState(dates[0]);
 const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

 const getStrategiesForDate = () => {
   const viewData = strategyData.find((data) => data.View === selectedView);
   if (!viewData?.Value[selectedDate]) return [];

   const strategies = viewData.Value[selectedDate];
   return Object.entries(_.groupBy(strategies)).map(([name, occurrences]) => ({
     name,
     count: occurrences.length,
   }));
 };

 return (
   <div className="max-w-2xl mx-auto p-2 sm:p-4 font-bold">
     {/* View Toggle */}
     <div className="bg-gray-100 rounded-xl p-1.5 flex gap-1 justify-between mb-4 overflow-x-auto">
       {views.map((view) => (
         <button
           key={view}
           className={`rounded-xl px-4 sm:px-10 py-2 text-xs sm:text-sm whitespace-nowrap ${
             selectedView === view ? "bg-blue-600 text-white" : "text-gray-500"
           }`}
           onClick={() => setSelectedView(view)}
         >
           {view}
         </button>
       ))}
     </div>

     {/* Date Dropdown */}
     <div className="relative mb-4">
       <button
         className="w-full p-3 sm:p-4 text-left text-sm sm:text-base border rounded-2xl flex justify-between items-center bg-white shadow-sm"
         onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
       >
         <span>{selectedDate}</span>
         <span
           className={`transform transition-transform ${
             isDateDropdownOpen ? "rotate-180" : ""
           }`}
         >
           <IoIosArrowDown />
         </span>
       </button>

       {isDateDropdownOpen && (
         <div className="absolute w-full mt-2 z-10">
           {dates.map((date) => (
             <button
               key={date}
               className="w-11/12 mx-auto block p-3 sm:p-4 text-sm sm:text-base text-left font-bold rounded-2xl my-1 bg-white border shadow-sm hover:bg-gray-50"
               onClick={() => {
                 setSelectedDate(date);
                 setIsDateDropdownOpen(false);
               }}
             >
               {date}
             </button>
           ))}
         </div>
       )}
     </div>

     {/* Strategy Cards */}
     <div
       className={`space-y-2 font-normal ${isDateDropdownOpen ? "mt-80 sm:mt-96" : ""}`}
     >
       {getStrategiesForDate().length > 0 ? (
         getStrategiesForDate().map(({ name, count }) => (
           <div
             key={name}
             className="p-3 sm:p-4 border rounded-2xl flex justify-between items-center"
           >
             <span className="font-bold text-sm sm:text-base">{name}</span>
             <span className="text-gray-500 flex items-center gap-1 text-sm sm:text-base">
               <GoDotFill className="opacity-50 text-sm" />
               {count} {count === 1 ? "Strategy" : "Strategies"}
             </span>
           </div>
         ))
       ) : (
         <div className="text-center text-base sm:text-lg py-24 sm:py-32 text-slate-800 font-semibold">
           There are no strategies for
           <br />
           <p className="mt-2 font-bold text-black">{selectedDate}</p>
         </div>
       )}
     </div>
   </div>
 );
};

export default App;