// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import { routes } from './routes';
// function App() {
//   return (
//     <div>
//       <Router>
//         <Routes>
//           {routes.map((route)=>{
//             const Page = route.page
            
//             return (
//               <Route key={route.path} path={route.path} element={
//                 // <Layout>
//                   <Page/>
//                 // </Layout>
//               }/> 
//             )
//           })}
          
//         </Routes>
//       </Router>
//     </div>
//   )
// }

// export default App
import "./App.css";
import Homepage from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Homepage />
    </div>
  );
}

export default App;