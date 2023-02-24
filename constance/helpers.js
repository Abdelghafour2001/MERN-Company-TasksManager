const countTotalHours = (employee, shifts, startDate, fromDate, toDate) => {
    let hours = 0;
    let minuts = 0;
    if(startDate) {
        shifts && shifts.map(shift => {
            if(
                new Date(shift.date).setHours(0, 0, 0, 0) === 
                new Date(startDate).setHours(0, 0, 0, 0)
            ){
                if(
                    ((employee && (
                        employee?._id === shift.employee || 
                        employee?._id === shift?.employee?._id ||
                        employee?.user === shift?.acceptedBy?._id
                        )) || // for employee from thee loop
                    (!employee && shift.employee === null && !shift.acceptedBy))
                ) {
                    hours += shift.endTime.slice(0,2) - shift.startTime.slice(0,2);
                    minuts += shift.endTime.slice(3,5) - shift.startTime.slice(3,5);
                }
            }
        });
    } else {
        shifts && shifts.map(shift => {
            if(
                ((employee && (
                    employee?._id === shift.employee || 
                    employee?._id === shift?.employee?._id ||
                    employee?.user === shift?.acceptedBy?._id
                    )) || // for employee from thee loop
                (!employee && shift.employee === null && !shift.acceptedBy))
            ) {
                let sTime = new Date(shift.date).setHours(0, 0, 0, 0);
                let fTime = new Date(fromDate).setHours(0, 0, 0, 0);
                let tTime = new Date(toDate).setHours(0, 0, 0, 0);
                if (sTime >= fTime && sTime <= tTime) {
                    hours += shift.endTime.slice(0,2) - shift.startTime.slice(0,2);
                    minuts += shift.endTime.slice(3,5) - shift.startTime.slice(3,5);
                }
            }
        });
    }

    const resultHours = (hours + minuts / 60).toString().split('.')[0] +'h'
    const resultMinuts = (hours + minuts / 60).toString().split('.')[1] ? (+((hours + minuts / 60).toFixed(2)).toString().split('.')[1] / 100 * 60) + 'm' : '';
    
    return resultHours + resultMinuts;
}

const countAsignedTotalHours = (shifts, startDate, fromDate, toDate) => {
    let hours = 0;
    let minuts = 0;
    if(startDate) {
        shifts && shifts.map(shift => {
            if(
                new Date(shift.date).setHours(0, 0, 0, 0) === 
                new Date(startDate).setHours(0, 0, 0, 0) 
            ) {
                hours += shift.endTime.slice(0,2) - shift.startTime.slice(0,2);
                minuts += shift.endTime.slice(3,5) - shift.startTime.slice(3,5);
            }
        });
    } else {
        shifts && shifts.map(shift => {
            let sTime = new Date(shift.date).setHours(0, 0, 0, 0);
            let fTime = new Date(fromDate).setHours(0, 0, 0, 0);
            let tTime = new Date(toDate).setHours(0, 0, 0, 0);
            if (sTime >= fTime && sTime <= tTime) {
                hours += shift.endTime.slice(0,2) - shift.startTime.slice(0,2);
                minuts += shift.endTime.slice(3,5) - shift.startTime.slice(3,5);
            }
        });
    }

    const resultHours = (hours + minuts / 60).toString().split('.')[0] +'h'
    const resultMinuts = (hours + minuts / 60).toString().split('.')[1] ? (+((hours + minuts / 60).toFixed(2)).toString().split('.')[1] / 100 * 60) + 'm' : '';
    
    return resultHours + resultMinuts;
}


const countTotalShiftHours = (startTime, endTime) => {
    let hours = 0;
    let minuts = 0;
    hours += endTime.slice(0,2) - startTime.slice(0,2);
    minuts += endTime.slice(3,5) - startTime.slice(3,5);
    const resultHours = (hours + minuts / 60).toString().split('.')[0] +'h'
    const resultMinuts = (hours + minuts / 60).toString().split('.')[1] ? (+((hours + minuts / 60).toFixed(2)).toString().split('.')[1] / 100 * 60) + 'm' : '';
    
    return resultHours + resultMinuts;
}

export {
    countTotalHours,
    countAsignedTotalHours,
    countTotalShiftHours
}