import { useSelector } from 'react-redux';
import { CreateBusiness, InviteUser, EmployeesModal, OwnerProtect, AdminProtect } from '../';
import { briefcaseIcon, webIcon } from '../../constance/icons';
import './styles/CompanyCard.css';

const CompanyCard = () => {
    const { user } = useSelector(state => state.auth);
    const { company, isLoading } = useSelector(state => state.company);

    return (
        <section className="companies">
            {!isLoading && company && (
                <div key={`company-${company._id}`} className="company-card">
                    <div className="company-card-image">
                        {company.logo ? (
                            <img src={company.logo} alt={company.name}/>
                        ) : (
                            <img src="https://www.zimplaza.co.zw/wp-content/uploads/placeholdercompany5f3438282f524800f1d49cd2921bb0a56101e1aa16097ebd313b64778fc7c4bd1611448792.png" alt={company.name}/>
                        )}
                    </div>
                    <div className="company-card-info">
                        <div className="title-1">
                            <h3>{company.name}</h3>
                        </div>
                        <div className="text-secondary title-3">
                            <p>{company.email}</p>
                        </div>
                        <div className="company-card-info-description">
                            <EmployeesModal/>
                            <div className="company-card-detail text-hover">
                                <div className="company-card-detail-icon">
                                    {briefcaseIcon}
                                </div>
                                <div className="company-card-detail-text">
                                    <p className="text-secondary">Businesses</p>
                                    <p>{company.businesses.length}</p>
                                </div>
                            </div>
                            {company.website && (
                            <div className="company-card-detail">
                                <div className="company-card-detail-icon">
                                    {webIcon}
                                </div>
                                <div className="company-card-detail-text">
                                    <p className="text-secondary">Website</p>
                                    <p>{company.website.replace('https://', '').replace('http://', '')}</p>
                                </div>
                            </div>
                            )}
                        </div>
                        <div className="flex align-between">
                            <AdminProtect>
                                <CreateBusiness 
                                    company={company}
                                />
                            </AdminProtect>
                            <OwnerProtect>
                                <InviteUser
                                    company={company}
                                />
                            </OwnerProtect>
                        </div>
                    </div>
                </div>
            )}
            {isLoading && (
                <div className="company-card blink"></div>
            )}
        </section>
    )
}

export default CompanyCard