import "./App.css";

// Original date picker
import Datepicker from "./components/Datepicker";

function App() {
  return (
    <div className="App container">
      <div className="mt-2 w-100 h-50 d-flex justify-content-center row">
        <div className="col-6">
          <Datepicker label="From" />
        </div>
      </div>
    </div>
  );
}


// Date range selection
// function App() {
//   return (
//     <div className="App container">
//       <div className="mt-2 w-100 h-50 d-flex justify-content-center row">
//         <div className="col">
//           <Datepicker label="From" />
//         </div>
//         <div className="col">
//           <Datepicker label="To" />
//         </div>
//       </div>
//     </div>
//   );
// }

// Date time picker
// import Datepicker from "./components/Datepicker/index_timepicker";
// function App() {
//   return (
//     <div className="App container">
//       <div className="mt-2 w-100 h-50 d-flex justify-content-center row">
//         <div className="col">
//           <Datepicker label="From" />
//         </div>
//       </div>
//     </div>
//   );
// }


// Block certain dates Date picker
// import Datepicker from "./components/Datepicker/index_block_dates";
// function App() {
//   return (
//     <div className="App container">
//       <div className="mt-2 w-100 h-50 d-flex justify-content-center row">
//         <div className="col">
//           <Datepicker label="From" />
//         </div>
//       </div>
//     </div>
//   );
// }


// react-datepicker
// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// function App() {
//   const [startDate, setStartDate] = useState(new Date());
//   return (
//     <div className="mt-2 w-100 h-50 d-flex justify-content-center">
//       <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
//     </div>
//   );
// }

// react-datepicker date picker select date range
// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// function App() {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(null);
//   const onChange = (dates) => {
//     const [start, end] = dates;
//     setStartDate(start);
//     setEndDate(end);
//   };
//   return (
//     <div className="mt-2 w-100 h-50 d-flex justify-content-center">
//       <DatePicker
//         selected={startDate}
//         onChange={onChange}
//         startDate={startDate}
//         endDate={endDate}
//         selectsRange
//         inline
//       />
//     </div>
//   );
// }


// MUI datepicker
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// function App() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <div className="mt-2 w-100 h-50 d-flex justify-content-center">
//         <DatePicker />
//       </div>
//     </LocalizationProvider>
//   );
// }

export default App;