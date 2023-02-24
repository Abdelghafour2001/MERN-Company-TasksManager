import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Alerts, Navbar, RequireAuth, RequireCompany, Sidebar } from './components';
import { Login, Register, Dashboard, Scheduler, Company, Businesses, Schedule, Profile, Main, Ticket, Task, Training } from './pages';



function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <div className="container">
          <Alerts />
          <Routes>
            {/* General path */}
            <Route path="/" element={<RequireAuth> <RequireCompany> <Main/> </RequireCompany> </RequireAuth>} />
            <Route path="/scheduler" element={<RequireAuth> <RequireCompany> <Scheduler/> </RequireCompany> </RequireAuth>} />
            <Route path="/scheduler/:id" element={<RequireAuth> <RequireCompany> <Scheduler/> </RequireCompany> </RequireAuth>} />
            <Route path="/company" element={<RequireAuth> <RequireCompany> <Company/> </RequireCompany> </RequireAuth>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />

            {/* dashboard path */}
            <Route path='/dashboard' element={
              <RequireAuth>
                <RequireCompany> 
                <Sidebar/>
              </RequireCompany>
              </RequireAuth>
            } />
            <Route path="/dashboard/shifts" 
              element={
                <RequireAuth>
                  <RequireCompany>
                    <Sidebar>
                      <Dashboard/>
                    </Sidebar>
                  </RequireCompany>
                </RequireAuth>
              } 
            />
            <Route path="/dashboard/tickets" 
              element={
                <RequireAuth>
                  <RequireCompany>
                    <Sidebar>
                      <Ticket/>
                    </Sidebar>
                  </RequireCompany>
                </RequireAuth>
              } 
            />
            <Route path="/dashboard/tasks" 
              element={
                <RequireAuth>
                  <RequireCompany>
                    <Sidebar>
                      <Task/>
                    </Sidebar>
                  </RequireCompany>
                </RequireAuth>
              } 
            />
            <Route path="/dashboard/businesses" 
              element={
                <RequireAuth>
                  <RequireCompany>
                    <Sidebar>
                      <Businesses/>
                    </Sidebar>
                  </RequireCompany>
                </RequireAuth>
              } 
            />
            <Route path="/dashboard/training" 
              element={
                <RequireAuth>
                  <RequireCompany>
                    <Sidebar>
                      <Training/>
                    </Sidebar>
                  </RequireCompany>
                </RequireAuth>
              } 
            />

            {/* User path */}
            <Route path='/user'
              element={
                <RequireAuth>
                  <RequireCompany> 
                  <Sidebar/>
                </RequireCompany>
                </RequireAuth>
              }
            />
            <Route path="/user/schedule" 
              element={
                <RequireAuth>
                  <RequireCompany> 
                  <Sidebar>
                    <Schedule/>
                  </Sidebar> 
                </RequireCompany>
                </RequireAuth>
              }
            />
            <Route path="/user/tickets" 
              element={
                <RequireAuth>
                  <RequireCompany>
                  <Sidebar>
                    <Ticket/>
                  </Sidebar>
                </RequireCompany>
                </RequireAuth>
              }
            />
            <Route path="/user/tasks" 
              element={
                <RequireAuth>
                  <RequireCompany>
                  <Sidebar>
                    <Task/>
                  </Sidebar>
                </RequireCompany>
                </RequireAuth>
              }
            />
            <Route path="/user/training" 
              element={
                <RequireAuth>
                  <RequireCompany>
                  <Sidebar>
                    <Training/>
                  </Sidebar>
                </RequireCompany>
                </RequireAuth>
              }
            />
            <Route path="/user/profile" 
              element={
                <RequireAuth>
                  <RequireCompany>
                  <Sidebar>
                    <Profile/>
                  </Sidebar>
                </RequireCompany>
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="bottom-right"
        theme="colored"
      />
    </>
  );
}

export default App;
