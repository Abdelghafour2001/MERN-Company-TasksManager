import { useState, forwardRef, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { getAllBusinessShifts } from '../../features/shift/shiftSlice';
import { customSelectStyles, timeframeOptions } from '../../constance/localData';
import { CopyShifts, ManagerProtect, Zoom } from '../';
import { arrowLeftIcon, arrowRightIcon, calenderRangeIcon } from '../../constance/icons';
import { setDateControl, setFromDate, setStartDate, setToDate } from '../../features/local/localSlice';


const Nav = () => {
    const { company } = useSelector(state => state.company);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const startDate = new Date (useSelector(state => state.local.time.startDate));
    const fromDate = new Date (useSelector(state => state.local.time.fromDate));
    const toDate = new Date (useSelector(state => state.local.time.toDate));
    const dateControl = useSelector(state => state.local.time.dateControl);

    const businessesSelect = company.businesses.map(business => {
        return {
            value: business._id,
            label: business.name
        }
    });

    function getPreviousMonday(date = new Date()) {
        const previousMonday = new Date();
        
        previousMonday.setMonth(startDate.getMonth(), date.getDate() - ((date.getDay() + 6) % 7));
        
        return previousMonday.toLocaleString("en-US");
    }

    // get rande of dates from previous monday to sunday
    function getRange(date = new Date()) {
        const previousMonday = new Date();
        
        if(dateControl === 'week') {
            previousMonday.setMonth(startDate.getMonth(), (date.getDate() - ((date.getDay() + 6) % 7)) + 6);
        } else if(dateControl === '2week') {
            previousMonday.setMonth(startDate.getMonth(), (date.getDate() - ((date.getDay() + 6) % 7) + 13));
        } else if(dateControl === '4week') {
            previousMonday.setMonth(startDate.getMonth(), (date.getDate() - ((date.getDay() + 6) % 7) + 27));
        }
        
        return previousMonday.toLocaleString("en-US");
    }

    // handle click on button for next or previous day, week, 2 week or month
    function handleNextPrev(value) {
        if(value === 'next') {
    
            if(dateControl === 'day') {
                dispatch(setStartDate(
                    new Date(startDate.setDate(startDate.getDate() + 1)).toLocaleString("en-US")
                ));
            } else {
                dispatch(setStartDate(
                    new Date(startDate.setMonth(toDate.getMonth(), toDate.getDate() + 1)).toLocaleString("en-US")
                ));
            }
    
        } else if(value === 'prev') {
    
            if(dateControl === 'day') {
                dispatch(setStartDate(
                    new Date(startDate.setDate(startDate.getDate() - 1)).toLocaleString("en-US")
                ));
            } else {
                dispatch(setStartDate(
                    new Date(startDate.setMonth(fromDate.getMonth(), fromDate.getDate() - 1)).toLocaleString("en-US")
                ));
            }
    
        }
    }

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="date btn btn-outline example-custom-input" onClick={onClick} ref={ref}>
            {calenderRangeIcon}
        </div>
    ));

    useEffect(() => {
        dispatch(setFromDate(getPreviousMonday(startDate)));
        dispatch(setToDate(getRange(startDate)));
    }, [startDate]);

    return (
        <>
        <div className="calender-header">
            <div className="flex align-between">
                <div className="calender-header-left">
                    <div className="date title-2 p-0">
                        {dateControl === 'day' ?
                        
                            startDate?.toLocaleString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) 
                        :(
                            fromDate?.toLocaleString("en-US", { month: 'short', day: 'numeric' }) + ' - ' +
                            toDate?.toLocaleString("en-US", { month: 'short', day: 'numeric' }) + ', ' +
                            fromDate?.toLocaleString("en-US", { year: 'numeric' }) 
                        )}
                    </div>
                </div>
                <ManagerProtect>
                    <CopyShifts />
                </ManagerProtect>
            </div>
            <div className="flex align-between">
                <div className="calender-header-left">
                    <div className="date-control btn-group btn-group-outline box-shadow">
                        <div 
                            className="prev-date btn btn-outline" 
                            onClick={() => { handleNextPrev('prev') }}
                        >
                            {arrowLeftIcon}
                        </div>
                        <DatePicker
                            selected={dateControl === "day" ? startDate : fromDate}
                            onChange={(date) => {
                                dispatch(setStartDate(
                                    date.toLocaleString("en-US")
                                ));
                            }}
                            customInput={<ExampleCustomInput />}
                            calendarStartDay={1}
                            startDate={dateControl === "day" ? startDate : fromDate}
                            endDate={dateControl === "day" ? startDate : toDate}
                        />
                        <div 
                            className="next-date btn btn-outline" 
                            onClick={() => { handleNextPrev('next') }}
                        >
                            {arrowRightIcon}
                        </div>
                    </div>
                    <div className="today-control">
                        <div 
                            className="today btn btn-outline" 
                            onClick={() => { dispatch(setStartDate(new Date().toLocaleString("en-US"))) }}
                        >
                            TODAY
                        </div>
                    </div>
                </div>
                <div className="calender-header-right">
                    <div className="select-control">
                        <Select
                            value={{value: dateControl, label: dateControl.slice(0, 1).toUpperCase() + dateControl.slice(1)}}
                            onChange={(e) => {
                                dispatch(setDateControl(e.value));
                                dispatch(setStartDate(new Date().toLocaleString("en-US")));
                            }}
                            isSearchable={false}
                            options={timeframeOptions}
                            styles={customSelectStyles}
                            
                        />
                    </div>
                    <div className="business-control">
                        <Select
                            value={{value: id, label: company.businesses.filter(business => business._id === id)[0].name}}
                            onChange={(e) => {navigate(`/scheduler/${e.value}`)}}
                            isSearchable={false}
                            options={businessesSelect}
                            styles={customSelectStyles}
                            
                        />
                    </div>
                </div>
            </div>
        </div>
        <Zoom/>
        </>
    )
}

export default Nav