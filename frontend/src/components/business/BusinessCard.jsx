import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Employees, CreateEmployee, UpdateBusiness, ManagerProtect, AdminProtect } from '../';
import { briefcaseIcon, timeIcon, locationIcon, phoneIcon } from '../../constance/icons';
import "./styles/BusinessCard.css";

const BusinessCard = ({ businesses, isLoading }) => {
  const { employees } = useSelector(state => state.employee);
  const { user } = useSelector(state => state.auth);
  const { company } = useSelector(state => state.company);
  return (
    <section className="businesses">
      {!isLoading && businesses && (
      businesses.map((business, i) => (
      <div key={`business-card-${i}`} className="business-card">
        <div className="business-card-header">
          <div className="business-card-header-info">
            <div className="business-card-header-info-left text-hover text-headline title-2">
              <Link to={`/scheduler/${business._id}`}>{business.name}</Link>
            </div>
              { employees && employees.map(employee => (
                (business._id === employee.business || business._id === employee.business._id ) && (
                    employee.user === user._id && (
                      <div key={`permition-${employee._id}`} className="business-card-header-info-right">
                        { company.user === user._id ? (
                          <p className="text-hover" title="Your permissions to this business">ADMIN</p>
                        ): company.owners.includes(employee.user) ? (
                          <>
                            <p className="text-hover" title="Your permissions to this business">OWNER</p>
                          </>
                        ): employee.isManager ? (
                          <>
                            <p className="text-hover" title="Your permissions to this business">MANAGER</p>
                          </>
                        ) : (
                          <>
                            <p className="text-hover" title="Your permissions to this business">EMPLOYEE</p>
                          </>
                        )}
                      
                      <AdminProtect>
                        <UpdateBusiness
                          business={business}
                        />
                      </AdminProtect>
                    </div>
                  )
                )
              ))}
          </div>
          <div className="business-card-header-info">
            <div className="business-card-header-info-left">
              {briefcaseIcon}
              <p>{business.type}</p>
            </div>
            {business.workHours && (
              <div className="business-card-header-info-right">
                <p>{business.workHours}</p>
                {timeIcon}
              </div>
            )}
          </div>
          <div className="business-card-header-info">
            <div className="business-card-header-info-left">
              {locationIcon}
              <p>{business.address}, {business.city} {business.state}, {business.zip}</p>
            </div>
            <div className="business-card-header-info-right">
              <p>{business.phoneNumber}</p>
              {phoneIcon}
            </div>
          </div>
        </div>
        <div className="business-card-body">
          <div className="busines-card-body-title title-3">
            <p className="title-2">Employees</p>
            <ManagerProtect
              business={business}
            >
              <CreateEmployee
                positions={business.positions}
                business={business}
              />
            </ManagerProtect>
          </div>
          <div className="business-card-body-employees">
            <Employees 
              positions={business.positions}
              businesses={businesses}
              business={business}
            />
          </div>
        </div>
      </div>
      ))
    )}
    {isLoading && (
      <div className="business-card blink">
        <div className="business-card-header"></div>
        <div className="busines-card-body-title">
          <p>Employees</p>
        </div>
        <div className="business-card-body-employees">
          {[...Array(5)].map((_, index) => {
            return (
              <div key={`loading-employee-card-${index}`} className="business-card-body-employee"></div>
              )
            })}
        </div>
      </div>
    )}
  </section>
  )
}

export default BusinessCard